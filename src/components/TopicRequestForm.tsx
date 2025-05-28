
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useTopicRequests } from '@/hooks/useTopicRequests';

const TopicRequestForm = () => {
  const { user } = useAuth();
  const { submitTopicRequest, isSubmitting } = useTopicRequests();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: '',
    topicTitle: '',
    topicDescription: '',
    interestLevel: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.fullName || !formData.topicTitle || !formData.topicDescription || !formData.interestLevel) {
      return;
    }

    const success = await submitTopicRequest(formData);
    if (success) {
      setIsOpen(false);
      setFormData({
        email: user?.email || '',
        fullName: '',
        topicTitle: '',
        topicDescription: '',
        interestLevel: '',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="border-purple-300 text-purple-600 hover:bg-purple-50">
          Request a Program Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request a Program Topic</DialogTitle>
          <DialogDescription>
            Tell us what program you'd like to see added to our platform. We review all requests and prioritize based on community interest.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topicTitle">Program Topic</Label>
            <Input
              id="topicTitle"
              placeholder="e.g., Meditation for Beginners"
              value={formData.topicTitle}
              onChange={(e) => setFormData({ ...formData, topicTitle: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topicDescription">Description</Label>
            <Textarea
              id="topicDescription"
              placeholder="Describe what this program should cover and why it would be valuable..."
              value={formData.topicDescription}
              onChange={(e) => setFormData({ ...formData, topicDescription: e.target.value })}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestLevel">Interest Level</Label>
            <Select value={formData.interestLevel} onValueChange={(value) => setFormData({ ...formData, interestLevel: value })}>
              <SelectTrigger>
                <SelectValue placeholder="How interested would you be?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low - Might be useful</SelectItem>
                <SelectItem value="Medium">Medium - Would definitely try</SelectItem>
                <SelectItem value="High">High - This is exactly what I need</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopicRequestForm;
