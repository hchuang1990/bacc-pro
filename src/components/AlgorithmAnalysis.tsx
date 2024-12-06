import React, { useState } from 'react';
import { GameRecord } from '../types/game';
import { Calculator } from 'lucide-react';
import { runAllAlgorithms, AlgorithmResult } from '../utils/algorithms';

interface AlgorithmAnalysisProps {
  gameRecords: GameRecord[];
  onClose: () => void;
}

export default function AlgorithmAnalysis({ gameRecords, onClose }: AlgorithmAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [results, setResults] = useState<AlgorithmResult[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const analysisResults = runAllAlgorithms(gameRecords);
      setResults(analysisResults);
      setIsAnalyzing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [gameRecords]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mt-8 max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-lg flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calculator size={24} className="text-indigo-600" />
            Analysis Results
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Analyzing patterns...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">{result.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Banker:</span>
                      <span className="font-semibold text-red-600">
                        {result.bankerPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Player:</span>
                      <span className="font-semibold text-blue-600">
                        {result.playerPercentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}