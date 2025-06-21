
import React from "react";
import Header from "@/components/Header";
import RadiosList from "@/components/RadiosList";
import LiveTVList from "@/components/LiveTVList";
import BottomNavigation from "@/components/BottomNavigation";

const RadioPage = () => {
  return (
    <div className="min-h-screen pb-16 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full blur-sm"></div>
            </div>
          ))}
        </div>
        
        {/* Large Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/30 to-rose-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full blur-2xl animate-bounce" style={{animationDuration: '5s', animationDelay: '4s'}}></div>
      </div>

      {/* Glass Morphism Overlay */}
      <div className="fixed inset-0 backdrop-blur-sm bg-gradient-to-br from-black/10 via-transparent to-black/5"></div>

      <div className="relative z-10">
        {/* Modern Floating Header */}
        <div className="pt-4 px-4">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl mx-4">
            <Header title="الإذاعات" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Radio Stations - Featured Card */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-400/20 to-teal-600/20 border border-emerald-300/30 rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500 hover:shadow-emerald-500/25">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4">
              <RadiosList />
            </div>
          </div>

          {/* Live TV - Elegant Card */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-400/20 to-pink-600/20 border border-purple-300/30 rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500 hover:shadow-purple-500/25">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4">
              <LiveTVList />
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default RadioPage;
