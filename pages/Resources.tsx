import React from 'react';
import ResourceCard from '../components/ResourceCard';
import { MOCK_RESOURCES } from '../constants';

const Resources: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Assets & Downloads</h1>
        <p className="text-gray-400">High-quality textures, footage, and project files to speed up your workflow.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_RESOURCES.map(res => (
          <ResourceCard key={res.id} resource={res} />
        ))}
      </div>
    </div>
  );
};

export default Resources;