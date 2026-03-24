Feature: Edit Prompt
  As a user
  I want to edit existing prompts
  So that I can keep them up to date

  Background:
    Given I am logged in
    And a prompt exists with title "Original Title" body "Original body text" and tags "original"

  Scenario: Successfully edit a prompt title and body
    When I open the home page
    And I click on "Original Title"
    And I click the Edit button
    And I update the title to "Updated Title"
    And I update the body to "Updated body text"
    And I click Update Prompt
    Then I should see "Updated Title" on the detail page

  Scenario: Edit a prompt and update its tags
    When I open the home page
    And I click on "Original Title"
    And I click the Edit button
    And I update the tags to "updated, newtag"
    And I click Update Prompt
    Then I should be on the detail page

  Scenario: Fail to save an edit without a title
    When I open the home page
    And I click on "Original Title"
    And I click the Edit button
    And I clear the title field
    And I click Update Prompt
    Then I should see an error message on the edit page
