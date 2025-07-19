import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Admin/Navbar'
import { getAllMentors, getAllWorkshops, getReviewsByTarget } from '../../services/getAllData'
import { deleteReview } from '../../services/adminServices'

export default function Reviews() {
  const [targetType, setTargetType] = useState('mentor');
  const [targetId, setTargetId] = useState('');
  const [mentors, setMentors] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(reviewId);
      setReviews(reviews => reviews.filter(r => r._id !== reviewId));
    } catch {
      alert('Failed to delete review.');
    }
  };

  // Fetch mentors and workshops for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      if (targetType === 'mentor') {
        const data = await getAllMentors();
        setMentors(data || []);
      } else {
        const data = await getAllWorkshops();
        setWorkshops(data.data || []);
      }
    };
    fetchData();
  }, [targetType]);

  // Fetch reviews when targetType or targetId changes
  useEffect(() => {
    if (!targetId) {
      setReviews([]);
      return;
    }
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const reviews = await getReviewsByTarget(targetType, targetId);
        setReviews(reviews || []);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [targetType, targetId]);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="bg-surface shadow-lg rounded-lg p-8 transition-theme">
            <div className="text-2xl font-bold text-primary mb-8">Reviews Management</div>
            {/* Dropdowns */}
            <div className="flex gap-4 mb-6">
              <select
                value={targetType}
                onChange={e => {
                  setTargetType(e.target.value);
                  setTargetId('');
                }}
                className="input-field bg-green-600 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="mentor">Mentor</option>
                <option value="workshop">Workshop</option>
              </select>
              <select
                value={targetId}
                onChange={e => setTargetId(e.target.value)}
                className="input-field bg-green-600 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={targetType === 'mentor' ? mentors.length === 0 : workshops.length === 0}
              >
                <option value="">Select {targetType}</option>
                {(targetType === 'mentor' ? mentors : workshops).map(item => (
                  <option key={item._id} value={item._id}>
                    {item.name || item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="card col-span-1 md:col-span-3 p-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Overall Rating</h2>
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-bold text-primary">4.5</p>
                    <div className="flex text-accent">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6" fill="#FFD700" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">5</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '40%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">40%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">4</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">30%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">3</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '15%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">15%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">2</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '10%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">10%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">1</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '5%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Recent Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="text-center text-accent mb-4">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                  <div className="text-center text-secondary mb-4">No reviews found.</div>
                ) : (
                  reviews.map((review, idx) => (
                    <div
                      key={review._id || idx}
                      className="bg-green-100 rounded-xl shadow-md p-6 flex flex-col gap-3 border border-green-300"
                    >
                      {/* Reviewer Info */}
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={review.author?.image || 'https://via.placeholder.com/48x48?text=User'}
                          alt={review.author?.name || 'User avatar'}
                          className="w-12 h-12 rounded-full border border-gray-200"
                        />
                        <div>
                          <div className="font-semibold text-primary">{review.author?.name || 'Anonymous'}</div>
                          <div className="text-xs text-gray-500">{review.author?.email}</div>
                    </div>
                        <div className="ml-auto text-xs text-gray-400">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                    </div>
                  </div>
                      {/* Target Info */}
                      <div className="flex items-center gap-2 text-xs text-green-700 font-medium mb-1">
                        <span className="bg-green-800 text-white px-4 py-1 rounded-full">
                          {review.targetType === 'mentor' ? 'Mentor' : 'Workshop'}
                        </span>
                        <span className="text-gray-700">
                          {review.targetName || review.targetTitle || review.targetId}
                        </span>
                </div>
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                          className="w-5 h-5"
                            fill={i < (review.rating || 0) ? '#FFD700' : '#E5E7EB'}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                        </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-500">{review.rating || 'No rating'}</span>
                    </div>
                      {/* Comment */}
                      <div className="text-gray-800 text-base mb-2">{review.comment || ''}</div>
                      <button
                        className="mt-2 self-end bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                        onClick={() => handleDeleteReview(review._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
              </div>
            </div>
          </main>
          
        </div>
      </div>
  )
}

