import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { useStarWarsSearch } from './useStarWarsSearch';

const apiMock: any = (response: any) => ({
  getPeople: jest.fn(() => new Promise((resolve) => {
    resolve(response);
  })),
});

const useSearchMock: any = (search: string | undefined) => () => ({ search });

describe('useStarWarsSearch', () => {
  describe('should handle undefined state:', () => {
    it('not poll API when `search` is empty', () => {
      const props = {
        api: apiMock(),
        useSearch: useSearchMock(''),
      };

      const MockComponent = () => {
        useStarWarsSearch(props);
        return null;
      };

      render(<MockComponent />);
      expect(props.api.getPeople).toBeCalledTimes(0);
    });

    it('not emit triggering states searchResults, responseStatus', () => {
      const props = {
        api: apiMock(),
        useSearch: useSearchMock(''),
      };

      const MockComponent = () => {
        const { searchResults, responseStatus } = useStarWarsSearch(props);
        return (
          <>
            {searchResults
            && <span data-testid="searchResults">{searchResults}</span>}
            {responseStatus && <span data-testid="responseStatus" />}
          </>
        );
      };

      const { queryByTestId } = render(<MockComponent />);
      expect(queryByTestId('searchResults')).toBeNull();
      expect(queryByTestId('responseStatus')).toBeNull();
    });
  });

  describe('should handle defined string:', () => {
    it('should poll API', () => {
      const props = {
        api: apiMock({ status: 200, json: () => [{ name: 'Yoda' }] }),
        useSearch: useSearchMock('Y'),
      } as any;

      const MockComponent = () => {
        useStarWarsSearch(props);
        return null;
      };

      render(<MockComponent />);
      expect(props.api.getPeople).toBeCalledTimes(1);
    });

    it('should handle API response', async () => {
      const props = {
        api: apiMock({
          status: 200,
          json: () => ({ results: [{ name: 'Yoda' }] }),
        }),
        useSearch: useSearchMock('Yod'),
      } as any;

      const MockComponent = () => {
        const { searchResults, responseStatus } = useStarWarsSearch(props);
        return (
          <>
            {searchResults
            && (
            <span data-testid="searchResults">
              {JSON.stringify(
                searchResults,
              )}
            </span>
            )}
            {responseStatus && <span data-testid="responseStatus" />}
          </>
        );
      };

      const { getByTestId, queryByTestId } = render(<MockComponent />);
      await waitFor(() => {
        expect(getByTestId('searchResults').innerHTML)
          .toContain('[{"name":"Yoda"}]');
        expect(queryByTestId('responseStatus')).toBeNull();
      });
    });

    it('should handle error code', async () => {
      const props = {
        api: apiMock({
          status: 404,
        }),
        useSearch: useSearchMock('Yod'),
      } as any;

      const MockComponent = () => {
        const { responseStatus } = useStarWarsSearch(props);
        return (
          <>
            {responseStatus && <span data-testid="responseStatus" />}
          </>
        );
      };

      const { getByTestId } = render(<MockComponent />);
      await waitFor(() => {
        expect(getByTestId('responseStatus')).toBeDefined();
      });
    });
  });
});
