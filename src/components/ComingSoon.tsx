"use client";
import React from 'react';

export default function ComingSoon({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div 
      onClick={(e) => { 
        e.preventDefault(); 
        alert("This module is currently in development and is scheduled for the upcoming v1.1 Enterprise Release."); 
      }} 
      className={`cursor-pointer ${className || ''}`}
    >
      {children}
    </div>
  );
}
