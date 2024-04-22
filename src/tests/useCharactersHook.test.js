import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-hooks';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useCharacters from '../hooks/useCharacters';
import { supabase } from '../supabase/client';

// Mock the Supabase client
vi.mock('../supabase/client', () => ({
    supabase: {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockImplementation(() => ({
        then: vi.fn().mockImplementation(callback => {
          // Simulate fetching data successfully
          callback({ data: [{ id: 1, name: 'John Doe' }], error: null });
          return { catch: vi.fn() };
        })
      }))
    }
  }));

describe('useCharacters', () => {

    it('should initially set loading to true and characters to empty', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useCharacters());
    
      // Immediately check the initial state
      expect(result.current.characters).toEqual([]);
      expect(result.current.loading).toBeTruthy();
      expect(result.current.error).toBeNull();
    
      // Wait for hook to update after the async operation
      await waitForNextUpdate();
    
      // Then check the states after the fetch has been completed
      expect(result.current.loading).toBeFalsy();
      expect(result.current.characters.length).toBeGreaterThan(0);
    });
    

  it('should handle errors when fetching characters', async () => {
    // Override the select method to simulate an error
    supabase.from().select.mockImplementation(() => ({
      then: vi.fn().mockImplementation((callback) => {
        callback({ data: null, error: { message: 'Failed to fetch' } });
        return { catch: vi.fn() };
      })
    }));

    const { result, waitForNextUpdate } = renderHook(() => useCharacters());

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).not.toBeNull();
    expect(result.current.characters).toEqual([]);
  });
});
