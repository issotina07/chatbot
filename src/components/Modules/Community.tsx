import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Heart, Send, Plus } from 'lucide-react';
import { CommunityPost, Comment } from '../../types';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Community: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Charger les posts depuis le localStorage
    const savedPosts = localStorage.getItem('community_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }

    // Charger les commentaires depuis le localStorage
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const savePosts = (newPosts: CommunityPost[]) => {
    localStorage.setItem('community_posts', JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const saveComments = (newComments: { [key: string]: Comment[] }) => {
    localStorage.setItem('comments', JSON.stringify(newComments));
    setComments(newComments);
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const post: CommunityPost = {
      id: Date.now().toString(),
      user_id: 'local-user',
      user_name: 'Utilisateur',
      ...newPost,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString()
    };

    const updatedPosts = [post, ...posts];
    savePosts(updatedPosts);
    toast.success('Publication ajoutée avec succès !');
    setNewPost({ title: '', content: '' });
    setShowNewPost(false);
  };

  const addComment = async (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      post_id: postId,
      user_id: 'local-user',
      user_name: 'Utilisateur',
      content: newComment,
      created_at: new Date().toISOString()
    };

    const updatedComments = {
      ...comments,
      [postId]: [...(comments[postId] || []), comment]
    };

    saveComments(updatedComments);
    setNewComment('');

    // Mettre à jour le nombre de commentaires
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, comments_count: (comments[postId]?.length || 0) + 1 }
        : post
    );
    savePosts(updatedPosts);
  };

  const toggleComments = (postId: string) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
    } else {
      setSelectedPost(postId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Espace Communautaire</h1>
        </div>
        <button
          onClick={() => setShowNewPost(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle publication</span>
        </button>
      </div>

      {showNewPost && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Nouvelle publication</h2>
          <form onSubmit={createPost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre *
              </label>
              <input
                type="text"
                required
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Titre de votre publication"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenu *
              </label>
              <textarea
                required
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                placeholder="Partagez vos idées, questions ou expériences..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Publier
              </button>
              <button
                type="button"
                onClick={() => setShowNewPost(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune publication</h3>
            <p className="text-gray-600">Soyez le premier à partager quelque chose avec la communauté !</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Par {post.user_name}</span>
                      <span>•</span>
                      <span>{format(new Date(post.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes_count}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments_count} commentaires</span>
                  </button>
                </div>
              </div>

              {selectedPost === post.id && (
                <div className="border-t border-gray-200 p-6">
                  <div className="space-y-4">
                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">{comment.user_name}</span>
                          <span className="text-sm text-gray-500">
                            {format(new Date(comment.created_at), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Ajouter un commentaire..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;