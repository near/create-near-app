import * as show from '../src/messages';
import SpyInstance = jest.SpyInstance;

describe('messages', () => {
  let showSpy: SpyInstance;
  test('snapshot basic messages', () => {
    showSpy = jest.spyOn(show, 'show').mockImplementation(() => {});
    show.welcome();
    show.setupFailed();
    show.argsError('wrong args');
    show.windowsWarning();
    show.creatingApp();
    show.depsInstall();
    show.depsInstallError();
    expect(showSpy.mock.calls).toMatchSnapshot();
    showSpy.mockClear();
  });

  test('snapshot messages with params', () => {
    showSpy = jest.spyOn(show, 'show').mockImplementation(() => {});

    show.successContractToText(true);

    show.successFrontendToText('next-page');
    show.successFrontendToText('next-app');

    show.unsupportedNodeVersion('55.789');
    show.directoryExists('/a/b/c/d');

    expect(showSpy.mock.calls).toMatchSnapshot();
    showSpy.mockClear();
  });

});