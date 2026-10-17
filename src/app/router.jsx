import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ShopPage } from '../pages/ShopPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export function AppRoutes({ searchQuery, selectedCategory, onSelectCategory }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ShopPage
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        }
      />
      <Route path="/checkout" element={<CheckoutPage />} />
      {/* Fallback to store */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
