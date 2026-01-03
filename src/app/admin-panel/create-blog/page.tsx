'use client';

import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateBlogPage() {
  const router = useRouter();
  const editorRef = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [contentType, setContentType] = useState<'html' | 'mdx'>('html');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    contentType: 'html' as 'html' | 'mdx',
    categoryId: '',
    author: 'Indranil Maiti',
    tags: '',
    isPublished: false,
    isFeatured: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterCreator: '@your_twitter'
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/get-all-blog-category?activeOnly=true');
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let content = '';
    if (contentType === 'html') {
      if (!editorRef.current) {
        alert('Editor not initialized');
        return;
      }
      content = editorRef.current.getContent();
    } else {
      content = formData.content;
    }

    if (!content || content.trim() === '') {
      alert('Please add some content');
      return;
    }

    if (!thumbnailFile) {
      alert('Please upload a thumbnail');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });
      formDataToSend.set('content', content);
      formDataToSend.append('thumbnail', thumbnailFile);

      const res = await fetch('/api/upload-blog', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await res.json();
      if (data.success) {
        alert('Blog created successfully!');
        router.push('/admin-panel/blogs');
      } else {
        alert(data.message || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('An error occurred while creating the blog');
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Create New Blog
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Draft your masterpiece and optimize it for the web.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl px-6"
            onClick={() => router.push('/admin-panel/blogs')}
            disabled={loading}
          >
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl px-8 bg-foreground text-background font-bold hover:scale-105 transition-transform"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Publish Post'
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editor (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Content Editor */}
          <Card className="glass-card border-none shadow-sm ring-1 ring-border/50 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border">
              <CardTitle>Content Editor</CardTitle>
              <CardDescription>Write your content using your preferred format</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="mb-5">
                <Label htmlFor="contentType" className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Content Type</Label>
                <Select
                  value={contentType}
                  onValueChange={(value: 'html' | 'mdx') => {
                    setContentType(value);
                    setFormData(prev => ({ ...prev, contentType: value }));
                  }}
                >
                  <SelectTrigger id="contentType" className="rounded-xl p-6 h-12 bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="html">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">Rich Text Editor (Visual)</span>
                        <span className="text-xs text-muted-foreground">Standard formatted blog post</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mdx">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">MDX Editor (Code)</span>
                        <span className="text-xs text-muted-foreground">For interactive components and live demos</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {contentType === 'html' ? (
                <div className="rounded-xl overflow-hidden border border-border">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'codesample', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | image media link | codesample code | help',
                      content_style: 'body { font-family:Inter,sans-serif; font-size:16px; line-height: 1.6; color: #333; }',
                      skin: "oxide",
                      content_css: "default",
                      images_upload_url: '/api/imagekit-auth',
                      automatic_uploads: true,
                      file_picker_types: 'file',
                      file_picker_callback: (callback: (url: string, meta?: Record<string, any>) => void, value: string, meta: Record<string, any>) => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        if (meta.filetype === 'image') input.setAttribute('accept', 'image/*');
                        else if (meta.filetype === 'media') input.setAttribute('accept', 'video/mp4,image/gif');
                        else input.setAttribute('accept', 'image/*,video/mp4,image/gif');

                        input.onchange = async function () {
                          const file = (this as HTMLInputElement).files?.[0];
                          if (!file) return;
                          const isVideo = file.type === 'video/mp4' || file.type === 'image/gif';
                          const uploadUrl = isVideo ? '/api/upload-video' : '/api/imagekit-auth';

                          try {
                            const formData = new FormData();
                            formData.append('file', file);
                            const response = await fetch(uploadUrl, { method: 'POST', body: formData });
                            const data = await response.json();
                            if (data.success || data.location) {
                              callback(data.location || data.url, { alt: file.name, title: file.name });
                            }
                          } catch (error) {
                            console.error('Upload error:', error);
                          }
                        };
                        input.click();
                      },
                      codesample_languages: [
                        { text: 'JavaScript', value: 'javascript' },
                        { text: 'TypeScript', value: 'typescript' },
                        { text: 'HTML/XML', value: 'markup' },
                        { text: 'CSS', value: 'css' },
                      ]
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-[500px] p-6 font-mono text-sm bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none scroll-smooth"
                    placeholder="# Start writing MDX..."
                  />
                  <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <span className="block w-2 h-2 rounded-full bg-primary animate-pulse" />
                      MDX Components Ready
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono text-muted-foreground">
                      <span>&lt;ColorPicker /&gt;</span>
                      <span>&lt;MarginDemo /&gt;</span>
                      <span>&lt;PaddingVisualizer /&gt;</span>
                      <span>&lt;FlexboxPlayground /&gt;</span>
                      <span>&lt;GridGenerator /&gt;</span>
                      <span>&lt;CSSAnimator /&gt;</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings (Sticky Sidebar) */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          {/* Basic Information */}
          <Card className="glass-card border-none shadow-sm ring-1 ring-border/50">
            <CardHeader className="bg-muted/30 border-b border-border">
              <CardTitle>Essential Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="rounded-xl h-11 bg-background/50"
                  placeholder="The future of design..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="rounded-xl h-11 bg-background/50 font-mono text-sm"
                  placeholder="future-of-design"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Excerpt *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="rounded-xl bg-background/50 min-h-[80px]"
                  placeholder="Provide a short summary..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryId" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                  >
                    <SelectTrigger className="rounded-xl h-11 bg-background/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="rounded-xl h-11 bg-background/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Feature Image</Label>
                <div className="relative group">
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="rounded-xl h-11 bg-background/50 py-2 cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 p-4 bg-accent/50 rounded-2xl border border-border">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold">Publish Instantly</Label>
                    <p className="text-xs text-muted-foreground">Make it visible to everyone</p>
                  </div>
                  <Switch
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => handleSwitchChange('isPublished', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold">Featured Story</Label>
                    <p className="text-xs text-muted-foreground">Promote to homepage hero</p>
                  </div>
                  <Switch
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleSwitchChange('isFeatured', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Sidebar Card */}
          <Card className="glass-card border-none shadow-sm ring-1 ring-border/50">
            <CardHeader className="bg-muted/30 border-b border-border">
              <CardTitle className="text-base">Search Engine Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Meta Title</Label>
                <Input
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="rounded-lg h-9 text-sm bg-background/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Meta Keywords</Label>
                <Input
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                  className="rounded-lg h-9 text-sm bg-background/30"
                  placeholder="design, dev, code"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4 pt-2">
            <Button variant="ghost" className="flex-1 rounded-xl h-12 text-muted-foreground hover:bg-muted">Draft Logs</Button>
            <Button type="submit" disabled={loading} className="flex-1 rounded-xl h-12 bg-foreground text-background font-bold shadow-lg hover:opacity-90 transition-opacity">
              Save Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}