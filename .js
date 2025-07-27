import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user?.role) return '/';
    switch (user.role) {
      case 'STUDENT': return '/student/dashboard';
      case 'RECRUITER': return '/recruiter/dashboard';
      case 'ADMIN': return '/admin/dashboard';
      default: return '/';
    }
  };

  const features = [
    {
      icon: Briefcase,
      title: 'Job Opportunities',
      description: 'Access thousands of internships and job opportunities from top companies.',
    },
    {
      icon: Users,
      title: 'Connect with Recruiters',
      description: 'Build meaningful connections with industry professionals and recruiters.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your progress and grow your career with our comprehensive tools.',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security measures.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      content: 'ZIDIO Connect helped me land my dream job. The platform is intuitive and the opportunities are amazing!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at Microsoft',
      content: 'As a recruiter, I love how easy it is to find qualified candidates. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Data Scientist at Amazon',
      content: 'The resume builder and career tools are fantastic. Got multiple interviews within weeks!',
      rating: 5,
    },
  ];

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Briefcase className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to continue your journey on ZIDIO Connect?
            </p>
            <Link
              to={getDashboardLink()}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

 
   return (
     <div className="min-h-screen bg-white">
       {/* Navigation */}
       <nav className="bg-white shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center py-6">
             <div className="flex items-center space-x-2">
               <Briefcase className="h-8 w-8 text-blue-600" />
               <span className="text-2xl font-bold text-gray-900">ZIDIO Connect</span>
             </div>
             <div className="flex items-center space-x-4">
               <Link
                 to="/login"
                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
               >
                 Sign In
               </Link>
               <Link
                 to="/register"
                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
               >
                 Get Started
               </Link>
             </div>
           </div>
         </div>
       </nav>
 
       {/* Hero Section */}
       <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
             <h1 className="text-4xl md:text-6xl font-bold mb-6">
               Connect Your Future with
               <span className="block text-blue-200">ZIDIO Connect</span>
             </h1>
             <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
               The ultimate platform connecting students with recruiters and career opportunities. 
               Build your future, one connection at a time.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link
                 to="/register"
                 className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
               >
                 Join as Student
                 <ArrowRight className="ml-2 h-5 w-5" />
               </Link>
               <Link
                 to="/register"
                 className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
               >
                 Join as Recruiter
                 <ArrowRight className="ml-2 h-5 w-5" />
               </Link>
             </div>
           </div>
         </div>
       </section>
 
       {/* Features Section */}
       <section className="py-20 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Why Choose ZIDIO Connect?
             </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Discover the features that make us the preferred platform for students and recruiters worldwide.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {features.map((feature, index) => {
               const Icon = feature.icon;
               return (
                 <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                   <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                     <Icon className="h-6 w-6 text-blue-600" />
                   </div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                   <p className="text-gray-600">{feature.description}</p>
                 </div>
               );
             })}
           </div>
         </div>
       </section>
 
       {/* Stats Section */}
       <section className="py-20 bg-blue-600 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div>
               <div className="text-4xl font-bold mb-2">10,000+</div>
               <div className="text-blue-200">Active Students</div>
             </div>
             <div>
               <div className="text-4xl font-bold mb-2">500+</div>
               <div className="text-blue-200">Partner Companies</div>
             </div>
             <div>
               <div className="text-4xl font-bold mb-2">95%</div>
               <div className="text-blue-200">Success Rate</div>
             </div>
           </div>
         </div>
       </section>
 
       {/* Testimonials Section */}
       <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               What Our Users Say
             </h2>
             <p className="text-xl text-gray-600">
               Don't just take our word for it - hear from our community
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {testimonials.map((testimonial, index) => (
               <div key={index} className="bg-gray-50 p-6 rounded-lg">
                 <div className="flex items-center mb-4">
                   {[...Array(testimonial.rating)].map((_, i) => (
                     <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                   ))}
                 </div>
                 <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                 <div>
                   <div className="font-semibold text-gray-900">{testimonial.name}</div>
                   <div className="text-gray-600 text-sm">{testimonial.role}</div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>
 
       {/* CTA Section */}
       <section className="py-20 bg-gray-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             Ready to Start Your Journey?
           </h2>
           <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
             Join thousands of students and recruiters who are already building their future with ZIDIO Connect.
           </p>
           <Link
             to="/register"
             className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 transition-colors"
           >
             Get Started Today
             <ArrowRight className="ml-2 h-5 w-5" />
           </Link>
         </div>
       </section>
 
       {/* Footer */}
       <footer className="bg-gray-800 text-white py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <div className="col-span-2">
               <div className="flex items-center space-x-2 mb-4">
                 <Briefcase className="h-8 w-8 text-blue-400" />
                 <span className="text-2xl font-bold">ZIDIO Connect</span>
               </div>
               <p className="text-gray-300 max-w-md">
                 Connecting talented students with amazing opportunities. Build your career with ZIDIO Connect.
               </p>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
               <ul className="space-y-2">
                 <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
                 <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
                 <li><Link to="/help" className="text-gray-300 hover:text-white">Help</Link></li>
               </ul>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4">Legal</h3>
               <ul className="space-y-2">
                 <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link></li>
                 <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link></li>
                 <li><Link to="/cookies" className="text-gray-300 hover:text-white">Cookies</Link></li>
               </ul>
             </div>
           </div>
           <div className="border-t border-gray-700 mt-8 pt-8 text-center">
             <p className="text-gray-300">© 2024 ZIDIO Connect. All rights reserved.</p>
           </div>
         </div>
       </footer>
     </div>
   );
 };
 
 export default Home;
