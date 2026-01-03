'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoreVertical, Edit, Trash2, Eye, Plus, Loader2, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/get-all-blogs?limit=50');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (blogId: string) => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/delete-blog/route.ts?blogId=${blogToDelete}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        // Remove from local state
        setBlogs(blogs.filter(blog => blog._id !== blogToDelete));
        alert('Blog deleted successfully!');
      } else {
        alert(data.message || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('An error occurred while deleting the blog');
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Blog Management</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage all your blog posts and their status</p>
        </div>
        <Link href="/admin-panel/create-blog">
          <Button className="rounded-2xl px-6 py-3 h-auto font-bold text-base hover:scale-105 transition-transform shadow-md">
            <Plus className="w-5 h-5" />
            Create New Blog
          </Button>
        </Link>
      </div>

      <Card className="glass-card border-none shadow-sm ring-1 ring-border/50">
        <CardHeader>
          <CardTitle>All Blogs</CardTitle>
          <CardDescription>
            {blogs.length} blog post{blogs.length !== 1 ? 's' : ''} total
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24 bg-muted/20 rounded-b-xl border-t border-border">
              <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium text-lg">No blogs found</p>
              <Link href="/admin-panel/create-blog" className="mt-4 inline-block">
                <Button variant="outline" className="rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-b border-border">
                  <TableHead className="px-6 py-4 font-bold text-foreground">Title</TableHead>
                  <TableHead className="px-6 py-4 font-bold text-foreground">Category</TableHead>
                  <TableHead className="px-6 py-4 font-bold text-foreground">Status</TableHead>
                  <TableHead className="px-6 py-4 font-bold text-foreground">Views</TableHead>
                  <TableHead className="px-6 py-4 font-bold text-foreground">Created</TableHead>
                  <TableHead className="px-6 py-4 font-bold text-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog._id} className="hover:bg-accent/50 transition-colors">
                    <TableCell className="px-6 py-4 font-semibold max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        {blog.title}
                        {blog.isFeatured && (
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-[10px] uppercase font-bold py-0 h-5">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className="rounded-lg font-medium">
                        {blog.categoryId?.name || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant={blog.isPublished ? 'default' : 'secondary'} className="rounded-lg font-bold text-[10px] uppercase tracking-wider">
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium text-foreground">{blog.views.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell suppressHydrationWarning className="px-6 py-4 text-muted-foreground font-medium">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/blog/${blog.slug}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin-panel/edit-blog/${blog._id}`)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(blog._id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post and all associated images from ImageKit.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}