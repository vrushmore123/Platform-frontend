import React from 'react';
import FeatureCard from '../components/FeatureCard';

const Landing = () => {
  return (
    <div className="font-sans">
      <section className="bg-blue-700 text-white p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to the Future of Learning for Schools & Universities</h1>
        <p className="mt-4 text-lg">A complete solution for education, internships, and jobs.</p>
      </section>

      <section className="p-8 bg-gray-100 text-center">
        <p className="max-w-4xl mx-auto text-gray-700 text-lg">
          Our platform is a modern, user-friendly system designed for all types of educational institutions – from primary and secondary schools to colleges and universities.
          It combines powerful Learning Management System (LMS) features with tools for internship coordination and student job placement.
        </p>
      </section>

      <section className="p-10 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Seamless LMS" features={[
            'Digital course organization',
            'Timetables and calendars',
            'Assignment submission and grading',
            'Feedback & assessment tools',
            'Teacher-student communication',
          ]} />
          <FeatureCard title="Internship Management" features={[
            'Student-company matching engine',
            'Automated workflows',
            'Verified employer profiles',
            'Progress tracking & evaluations',
          ]} />
          <FeatureCard title="Career Readiness" features={[
            'Job listings within the platform',
            'Career guidance & CV support',
            'Integration with job platforms',
            'Monitor post-grad job status',
          ]} />
        </div>
      </section>

      <section className="bg-gray-100 p-10">
        <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
        <ul className="max-w-xl mx-auto list-disc list-inside text-gray-800 space-y-2">
          <li>Scalable for all education levels</li>
          <li>GDPR-compliant & secure storage</li>
          <li>Support for educators and students</li>
          <li>Boosts student visibility and career success</li>
        </ul>
      </section>

      <footer className="bg-blue-700 text-white text-center py-4">
        © 2025 FutureLearn LMS. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
