import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';
import useLikes from '../hooks/useLikes';
import { supabase } from '../supabase/client';
import { useAuth } from '../context/AuthProvider';

// Mock the AuthProvider 
vi.mock('../context/AuthProvider', () => ({
  useAuth: vi.fn()  // Mock useAuth
}));

//Mocking supabase client
vi.mock('../supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(), 
    select: vi.fn().mockReturnThis(), 
    eq: vi.fn().mockImplementation(() => ({
      then: vi.fn().mockImplementation((successCallback, errorCallback) => {
        successCallback({ data: [{ user_id: 'user1', character_id: 'char1' }], error: null });
        return { catch: vi.fn() }; 
      })
    }))
  }
}));

describe('useLikes', () => {
  beforeEach(() => {
    // Mock the `useAuth` to return a fixed user id
    useAuth.mockImplementation(() => ({
      user: { id: 'user1' }
    }));
  });

  it('fetches likes and determines if the user has liked the character', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLikes('char1'));

    expect(result.current.loading).toBeTruthy();
    expect(result.current.likes).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.likes.length).toBeGreaterThan(0);
    expect(result.current.isLiked).toBeTruthy();  // Expecting true since user_id 'user1' is in the returned data
  });
});
