//require config for github credentials
var config = require('./config.js')

var name = "Oktavianus Gozali"
var gist_desc = "Shopee Test"
var gist_file_name = "Test Shopee.txt"
var gist_content = "Test Shopee"

//Test Suite
describe("Gist Test Case",function(){
    //Test Cases Begin Here, each 'it' is a test case
    before(function () {
        // log in before any of the tests run.
        cy.clearCookies()
        cy.visit("https://github.com/login")
        //Enter User Id
        cy.get('input[id=login_field]').type(config.github_id)
        //Enter Password
        cy.get('input[id=password]').type(config.github_password)
        //Sign In
        cy.get('input[type=submit]').click({force:true})
        cy.getCookies()
      })

    //Preserve Cookies for Github Session
    afterEach(function(){
        Cypress.Cookies.preserveOnce("has_recent_activity","_octo","user_session","__Host-user_session_same_site","logged_in","dotcom_user","_gh_sess")
    })

    //Scenario of Tests Begin Here

    it("Create New Public Gists", function(){
        cy.visit('https://gist.github.com/')
        cy.url().should('contain','gist')
        //Gist Desc and File Name
        cy.get('div#gists > input:eq(0)').type(gist_desc)
        cy.get('div#gists').find('.js-gist-file > div').find('.form-control.filename.js-gist-filename.js-blob-filename').type(gist_file_name)
        
        //Input File Content
        cy.get('.CodeMirror-code').type(gist_content)
        cy.get('div.form-actions > button:eq(0)').click({force:true})
    })

    it("See List of Gists",function(){
        cy.visit('https://gist.github.com/')
        //Click See All Gists Elements
        cy.get('.flex-auto.py-3.text-bold.text-right.f6.lh-condensed > a').click({force:true})

        //Assert the gist that has been added before
        cy.get('.repository-content.gist-content > div:eq(0) > .gist-snippet-meta > div > span').should('contain',gist_desc)
        cy.get('.repository-content.gist-content > div:eq(0) > .gist-snippet-meta > div > span> a:eq(1) > strong').should('contain',gist_file_name)
    })

    it("Edit Gists", function(){
        //Select the First Position Gists on the List
        cy.get('.repository-content.gist-content > div:eq(0) > .gist-snippet-meta > div > span> a:eq(1)').click({force:true})

        //Click Edit Button
        cy.get('.pagehead-actions > li:eq(0) > a').click({force:true})

        //Edit code Snippet
        cy.get('.CodeMirror-code').clear().type('Test Shopee '+name)

        //Save Editing
        cy.get('.form-actions > button').click({force:true})

    })

    it("Delete Gists", function(){
        // /Delete Gists and ignore windows Alert
        cy.get('.pagehead-actions > li:eq(1) > form > button').click({force:true})
        cy.wait(2000)
        cy.visit('https://gist.github.com/')
        //Click See All Gists Elements
        cy.get('.flex-auto.py-3.text-bold.text-right.f6.lh-condensed > a').click({force:true})
    })
})