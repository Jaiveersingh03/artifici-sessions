import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, LogOut, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Course {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  instructor: string;
  instructor_email: string;
  date: string;
  time: string;
  price: number;
  is_active: boolean;
}

const TeacherDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchCourses();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    setUserEmail(user.email || '');

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    const isTeacherOrAdmin = roles?.some(r => r.role === 'teacher' || r.role === 'admin');
    
    if (!isTeacherOrAdmin) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You need teacher or admin privileges to access this page.',
      });
      navigate('/');
    }
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch courses',
      });
    } else {
      setCourses(data || []);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const courseData = {
      title: formData.get('title') as string,
      short_description: formData.get('short_description') as string,
      full_description: formData.get('full_description') as string,
      instructor: formData.get('instructor') as string,
      instructor_email: userEmail,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      price: parseFloat(formData.get('price') as string),
      is_active: true,
    };

    if (editingCourse) {
      const { error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', editingCourse.id);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      } else {
        toast({
          title: 'Success',
          description: 'Course updated successfully',
        });
        fetchCourses();
        setIsDialogOpen(false);
        setEditingCourse(null);
      }
    } else {
      const { error } = await supabase.from('courses').insert(courseData);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      } else {
        toast({
          title: 'Success',
          description: 'Course added successfully',
        });
        fetchCourses();
        setIsDialogOpen(false);
      }
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } else {
      toast({
        title: 'Success',
        description: 'Course deleted successfully',
      });
      fetchCourses();
    }
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingCourse(null);
    setIsDialogOpen(false);
    setTimeout(() => setIsDialogOpen(true), 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="gradient-bg min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
            <p className="text-gray-600">Manage your courses</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="btn-primary gap-2">
                <Plus className="w-4 h-4" />
                Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
                <DialogDescription>
                  Fill in the details to {editingCourse ? 'update' : 'create'} a course
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    defaultValue={editingCourse?.title}
                    placeholder="AI Foundations"
                  />
                </div>
                <div>
                  <Label htmlFor="short_description">Short Description</Label>
                  <Input
                    id="short_description"
                    name="short_description"
                    required
                    defaultValue={editingCourse?.short_description}
                    placeholder="Brief overview of the course"
                  />
                </div>
                <div>
                  <Label htmlFor="full_description">Full Description</Label>
                  <Textarea
                    id="full_description"
                    name="full_description"
                    required
                    defaultValue={editingCourse?.full_description}
                    placeholder="Detailed course description"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="instructor">Instructor Name</Label>
                  <Input
                    id="instructor"
                    name="instructor"
                    required
                    defaultValue={editingCourse?.instructor}
                    placeholder="Dr. Ada Lovelace"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      required
                      defaultValue={editingCourse?.date}
                      placeholder="October 15, 2025"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      required
                      defaultValue={editingCourse?.time}
                      placeholder="10:00 AM - 12:00 PM"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    defaultValue={editingCourse?.price}
                    placeholder="49.99"
                  />
                </div>
                <Button type="submit" className="w-full btn-primary">
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card-3d bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.short_description}</p>
              <p className="text-sm text-gray-500 mb-2">By {course.instructor}</p>
              <p className="text-sm text-gray-500 mb-2">
                {course.date} at {course.time}
              </p>
              <p className="text-2xl font-bold text-primary mb-4">${course.price}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => openEditDialog(course)}
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(course.id)}
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl">
            <p className="text-gray-500 text-lg">No courses yet. Add your first course to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
