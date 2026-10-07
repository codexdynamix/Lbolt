import React, { useState, useMemo, useEffect } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  Edit3,
  Copy,
  Search,
  BookOpen,
  LayoutGrid,
  ListFilter,
  X,
  Zap,
} from "lucide-react";
import { calculateReadingTime } from "@/lib/reading-time";
import { analyzePowerWords } from "@/lib/power-words";
import { BlogEditorPage } from "./BlogEditorPage";
import type { BlogPost } from "@/types/crm";
import { getStoredCategories } from "@/lib/categories";

interface BlogsTabProps {
  blogs: BlogPost[];
  onSaveBlog: (data: any) => Promise<boolean>;
  onDeleteBlog: (id: number) => Promise<boolean>;
  onToggleStatus?: (id: number, status: string) => Promise<boolean>;
  onDuplicateBlog?: (id: number) => Promise<boolean>;
  onEditorStateChange?: (isEditing: boolean) => void;
}

export function BlogsTab({
  blogs,
  onSaveBlog,
  onDeleteBlog,
  onToggleStatus,
  onDuplicateBlog,
  onEditorStateChange,
}: BlogsTabProps) {
  // Page / Editor View State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Search, Filters & View Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<"all" | "published" | "draft" | "archived">("all");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title" | "words">("newest");
  const [viewLayout, setViewLayout] = useState<"grid" | "table">("grid");

  // Keep parent notified for layout adjustment
  useEffect(() => {
    onEditorStateChange?.(isEditorOpen);
  }, [isEditorOpen, onEditorStateChange]);

  // Read URL params on mount or change to support direct link / deep linking
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const action = params.get("action");
      const editId = params.get("edit");
      if (action === "new" || action === "create") {
        setEditingBlog(null);
        setIsEditorOpen(true);
      } else if (editId) {
        const found = blogs.find((b) => String(b.id) === editId);
        if (found) {
          setEditingBlog(found);
          setIsEditorOpen(true);
        }
      }
    } catch {
      // Browser URL reading fallback
      setIsEditorOpen(false);
    }
  }, [blogs]);

  // Listen to popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const action = params.get("action");
        const editId = params.get("edit");
        if (action === "new" || action === "create") {
          setEditingBlog(null);
          setIsEditorOpen(true);
        } else if (editId) {
          const found = blogs.find((b) => String(b.id) === editId);
          if (found) {
            setEditingBlog(found);
            setIsEditorOpen(true);
          }
        } else {
          setIsEditorOpen(false);
          setEditingBlog(null);
        }
      } catch {
        // Popstate fallback
        setIsEditorOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [blogs]);

  // Categories List (stored categories + any custom categories on blogs)
  const categoriesList = useMemo(() => {
    const stored = getStoredCategories().map((c) => c.name);
    const fromBlogs = blogs.map((b) => b.category).filter(Boolean);
    return Array.from(new Set([...stored, ...fromBlogs]));
  }, [blogs]);

  // Stats Calculations
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.status === "published" || !b.status).length;
    const drafts = blogs.filter((b) => b.status === "draft").length;
    const totalWords = blogs.reduce((acc, b) => acc + (b.content?.split(/\s+/).filter(Boolean).length || 0), 0);
    return { total, published, drafts, totalWords };
  }, [blogs]);

  // Filtered & Sorted Blogs List
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((b) => {
        // Status filter
        if (selectedStatusFilter === "published" && b.status !== "published" && b.status) return false;
        if (selectedStatusFilter === "draft" && b.status !== "draft") return false;
        if (selectedStatusFilter === "archived" && b.status !== "archived") return false;

        // Category filter
        if (selectedCategoryFilter !== "all" && b.category !== selectedCategoryFilter) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = b.title?.toLowerCase().includes(q);
          const matchSlug = b.slug?.toLowerCase().includes(q);
          const matchExcerpt = b.excerpt?.toLowerCase().includes(q);
          const matchContent = b.content?.toLowerCase().includes(q);
          const matchKeyword = b.focus_keyword?.toLowerCase().includes(q);
          const matchCategory = b.category?.toLowerCase().includes(q);
          return matchTitle || matchSlug || matchExcerpt || matchContent || matchKeyword || matchCategory;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        }
        if (sortBy === "oldest") {
          return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
        }
        if (sortBy === "title") {
          return (a.title || "").localeCompare(b.title || "");
        }
        if (sortBy === "words") {
          const wordsA = (a.content || "").split(/\s+/).filter(Boolean).length;
          const wordsB = (b.content || "").split(/\s+/).filter(Boolean).length;
          return wordsB - wordsA;
        }
        return 0;
      });
  }, [blogs, selectedStatusFilter, selectedCategoryFilter, searchQuery, sortBy]);

  // Open Editor for new article as a FULL PAGE
  const handleOpenCreate = () => {
    setEditingBlog(null);
    setIsEditorOpen(true);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("action", "new");
      url.searchParams.delete("edit");
      window.history.pushState({ blogMode: "new" }, "", url.toString());
    } catch {
      // Ignore URL history errors
    }
  };

  // Open Editor for existing article as a FULL PAGE
  const handleOpenEdit = (b: BlogPost) => {
    setEditingBlog(b);
    setIsEditorOpen(true);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("edit", String(b.id));
      url.searchParams.delete("action");
      window.history.pushState({ blogMode: "edit", id: b.id }, "", url.toString());
    } catch {
      // Ignore URL history errors
    }
  };

  // Return to articles table/grid
  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingBlog(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("action");
      url.searchParams.delete("edit");
      window.history.pushState({}, "", url.toString());
    } catch {
      // Ignore URL history errors
    }
  };

  // Render Full-Page Blog Editor when opened
  if (isEditorOpen) {
    return (
      <BlogEditorPage
        editingId={editingBlog?.id || null}
        initialBlog={editingBlog}
        onBack={handleCloseEditor}
        onSave={async (payload, _status) => {
          const ok = await onSaveBlog(payload);
          return ok;
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-label font-display flex items-center gap-2">
            <BookOpen className="size-5 text-blue" />
            <span>Blog & Architectural Teardowns</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Craft, optimize with Rank Math SEO & Power Words, and publish technical insights directly to the Codex Dynamics site.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-blue hover:bg-blue-hover text-white text-xs font-semibold rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="size-4" />
            <span>New Blog Article</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="surface-lift rounded-2xl bg-card border border-black/8 p-4">
          <span className="text-[11px] font-medium text-subtle uppercase tracking-wider block">Total Articles</span>
          <span className="text-2xl font-bold text-label font-display mt-1 block">{stats.total}</span>
        </div>
        <div className="surface-lift rounded-2xl bg-card border border-black/8 p-4">
          <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider block">Live Published</span>
          <span className="text-2xl font-bold text-emerald-700 font-display mt-1 block">{stats.published}</span>
        </div>
        <div className="surface-lift rounded-2xl bg-card border border-black/8 p-4">
          <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">Drafts / In Progress</span>
          <span className="text-2xl font-bold text-amber-700 font-display mt-1 block">{stats.drafts}</span>
        </div>
        <div className="surface-lift rounded-2xl bg-card border border-black/8 p-4">
          <span className="text-[11px] font-medium text-blue uppercase tracking-wider block">Total Words Written</span>
          <span className="text-2xl font-bold text-label font-display mt-1 block">
            {stats.totalWords.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 3. Search, Filters & View Mode Bar */}
      <div className="surface-lift rounded-2xl bg-card border border-black/8 p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="size-4 text-subtle absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, keyword, slug, or content..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-fill/50 hover:bg-fill border border-black/8 rounded-xl focus:border-blue focus:bg-white outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-label cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Filter Badges & View Switcher */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-fill/50 border border-black/8 rounded-xl text-label font-medium focus:border-blue outline-none cursor-pointer"
          >
            <option value="all">All Statuses ({blogs.length})</option>
            <option value="published">Published ({stats.published})</option>
            <option value="draft">Drafts ({stats.drafts})</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-fill/50 border border-black/8 rounded-xl text-label font-medium focus:border-blue outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categoriesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-fill/50 border border-black/8 rounded-xl text-label font-medium focus:border-blue outline-none cursor-pointer"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="title">Sort: Title (A-Z)</option>
            <option value="words">Sort: Word Count</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center rounded-xl bg-fill/60 p-1 border border-black/6">
            <button
              type="button"
              onClick={() => setViewLayout("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewLayout === "grid" ? "bg-white text-blue shadow-xs" : "text-subtle hover:text-label"
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewLayout("table")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewLayout === "table" ? "bg-white text-blue shadow-xs" : "text-subtle hover:text-label"
              }`}
              title="Detailed Table View"
            >
              <ListFilter className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Articles Content */}
      {filteredBlogs.length === 0 ? (
        <div className="surface-lift rounded-3xl bg-card border border-black/8 p-12 text-center space-y-4">
          <div className="size-14 rounded-full bg-blue/10 text-blue flex items-center justify-center mx-auto">
            <FileText className="size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-label font-display">No articles found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {searchQuery || selectedStatusFilter !== "all" || selectedCategoryFilter !== "all"
                ? "Try adjusting your search terms or filter criteria."
                : "Your publication studio is clean. Create your first architectural teardown or case study."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-blue text-white rounded-full text-xs font-semibold hover:bg-blue-hover shadow-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            <span>Create Article</span>
          </button>
        </div>
      ) : viewLayout === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBlogs.map((b) => {
            const readingTime = calculateReadingTime(b.content || "");
            const wordCount = (b.content || "").split(/\s+/).filter(Boolean).length;
            const powerAnalysis = analyzePowerWords(b.title || "", b.content || "");
            const isPublished = b.status === "published" || !b.status;

            return (
              <div
                key={b.id}
                className="surface-lift rounded-3xl bg-card border border-black/8 overflow-hidden flex flex-col hover:border-black/20 hover:shadow-md transition-all group"
              >
                {/* Card Cover Image Header */}
                <div className="relative aspect-[16/9] bg-fill overflow-hidden">
                  {b.cover_image ? (
                    <img
                      src={b.cover_image}
                      alt={b.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue/5 via-black/5 to-blue/10">
                      <FileText className="size-10 text-muted-foreground/40" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (onToggleStatus) {
                          const next = isPublished ? "draft" : "published";
                          onToggleStatus(b.id, next);
                        }
                      }}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-xs cursor-pointer transition-transform active:scale-95 ${
                        isPublished
                          ? "bg-emerald-500 text-white"
                          : b.status === "draft"
                          ? "bg-amber-500 text-white"
                          : "bg-zinc-600 text-white"
                      }`}
                      title="Click to toggle status"
                    >
                      {b.status || "published"}
                    </button>
                    {powerAnalysis.headlineHasPowerWord && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white shadow-xs flex items-center gap-1">
                        <Zap className="size-2.5" />
                        <span>Power</span>
                      </span>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/70 text-white backdrop-blur-xs">
                      {b.category || "Engineering"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                      <span>{wordCount} words</span>
                      <span>•</span>
                      <span>{readingTime.text}</span>
                      <span>•</span>
                      <span>{b.created_at ? new Date(b.created_at).toLocaleDateString() : "Recent"}</span>
                    </div>

                    <h3 className="text-base font-bold text-label font-display group-hover:text-blue transition-colors line-clamp-2">
                      {b.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {b.excerpt || b.content?.slice(0, 140) || "No excerpt provided."}
                    </p>

                    {b.focus_keyword && (
                      <div className="flex items-center gap-1 text-[11px] text-blue font-mono bg-blue/5 px-2 py-0.5 rounded-md self-start inline-flex">
                        <Sparkles className="size-3" />
                        <span className="truncate">KW: {b.focus_keyword}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-black/6 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(b)}
                        className="px-3 py-1.5 rounded-xl bg-blue/10 hover:bg-blue/20 text-blue font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Edit3 className="size-3.5" />
                        <span>Edit</span>
                      </button>

                      <a
                        href={`/blog?slug=${b.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-xl text-subtle hover:text-label hover:bg-black/5 transition-colors cursor-pointer"
                        title="View Public Article"
                      >
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-1">
                      {onDuplicateBlog && (
                        <button
                          type="button"
                          onClick={() => onDuplicateBlog(b.id)}
                          className="p-1.5 rounded-xl text-subtle hover:text-label hover:bg-black/5 transition-colors cursor-pointer"
                          title="Duplicate Article"
                        >
                          <Copy className="size-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete article "${b.title}"? This cannot be undone.`)) {
                            onDeleteBlog(b.id);
                          }
                        }}
                        className="p-1.5 rounded-xl text-subtle hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="surface-lift rounded-3xl bg-card border border-black/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/8 bg-fill/40 text-subtle uppercase text-[10px] font-semibold tracking-wider font-mono">
                  <th className="py-3.5 px-4">Article Title & Keyword</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Length</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/6">
                {filteredBlogs.map((b) => {
                  const readingTime = calculateReadingTime(b.content || "");
                  const wordCount = (b.content || "").split(/\s+/).filter(Boolean).length;
                  const power = analyzePowerWords(b.title || "", b.content || "");

                  return (
                    <tr key={b.id} className="hover:bg-fill/30 transition-colors group">
                      <td className="py-3 px-4 max-w-xs sm:max-w-sm">
                        <div className="flex items-center gap-3">
                          {b.cover_image && (
                            <img
                              src={b.cover_image}
                              alt=""
                              className="size-9 rounded-lg object-cover border border-black/10 shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <span className="font-semibold text-label block truncate group-hover:text-blue transition-colors">
                              {b.title}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono truncate">
                              <span>/blog?slug={b.slug}</span>
                              {power.headlineHasPowerWord && (
                                <span className="text-purple-600 font-bold flex items-center gap-0.5">
                                  <Zap className="size-2.5" />
                                  <span>Power</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-fill border border-black/8">
                          {b.category || "Engineering"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => {
                            if (onToggleStatus) {
                              const next = (b.status === "published" || !b.status) ? "draft" : "published";
                              onToggleStatus(b.id, next);
                            }
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-transform active:scale-95 ${
                            b.status === "published" || !b.status
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : b.status === "draft"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                          title="Click to toggle status"
                        >
                          {b.status || "published"}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">
                        {wordCount}w • {readingTime.text}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-[11px]">
                        {b.created_at ? new Date(b.created_at).toLocaleDateString() : "Recent"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(b)}
                            className="p-1.5 rounded-lg text-blue hover:bg-blue/10 transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit3 className="size-4" />
                          </button>
                          <a
                            href={`/blog?slug=${b.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-subtle hover:text-label hover:bg-black/5 transition-colors cursor-pointer"
                            title="View Public Article"
                          >
                            <ExternalLink className="size-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete article "${b.title}"?`)) {
                                onDeleteBlog(b.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-subtle hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
