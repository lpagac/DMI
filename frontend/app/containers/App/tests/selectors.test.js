import {
  makeSelectLocation,
  makeSelectLoading,
  makeSelectError,
  makeSelectStrings,
  makeSelectAddingString,
  makeSelectAddingStringSuccess,
  makeSelectAddingStringError,
} from 'containers/App/selectors';

const global = {
  loading: 'loading',
  error: 'error',
  strings: 'strings',
  addingString: 'addingString',
  addingStringSuccess: 'addingStringSuccess',
  addingStringError: 'addingStringError',
};

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedRouterState = {
      router,
    };
    expect(makeSelectLocation()(mockedRouterState)).toEqual(router.location);
  });
});

describe('global selectors', () => {
  describe('makeSelectLoading', () => {
    it('should select loading', () => {
      const mockedGlobalState = { global };
      expect(makeSelectLoading()(mockedGlobalState)).toEqual(global.loading);
    });
  });

  describe('makeSelectError', () => {
    it('should select error', () => {
      const mockedGlobalState = { global };
      expect(makeSelectError()(mockedGlobalState)).toEqual(global.error);
    });
  });

  describe('makeSelectStrings', () => {
    it('should select the strings', () => {
      const mockedGlobalState = { global };
      expect(makeSelectStrings()(mockedGlobalState)).toEqual(global.strings);
    });
  });

  describe('makeSelectAddingString', () => {
    it('should select addingString', () => {
      const mockedGlobalState = { global };
      expect(makeSelectAddingString()(mockedGlobalState)).toEqual(
        global.addingString,
      );
    });
  });

  describe('makeSelectAddingStringError', () => {
    it('should select addingStringError', () => {
      const mockedGlobalState = { global };
      expect(makeSelectAddingStringError()(mockedGlobalState)).toEqual(
        global.addingStringError,
      );
    });
  });

  describe('makeSelectAddingStringSuccess', () => {
    it('should select addingStringSuccess', () => {
      const mockedGlobalState = { global };
      expect(makeSelectAddingStringSuccess()(mockedGlobalState)).toEqual(
        global.addingStringSuccess,
      );
    });
  });
});
