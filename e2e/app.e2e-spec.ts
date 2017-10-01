import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for robin-hood', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be robin-hood', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('robin-hood');
    })
  });

  it('navbar-brand should be robin-hood@0.1.9',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('robin-hood@0.1.9');
  });

  
    it('Request component should be loadable',() => {
      page.navigateTo('/Request');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Request');
    });

    it('Request table should have 4 columns',() => {
      page.navigateTo('/Request');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  

});
