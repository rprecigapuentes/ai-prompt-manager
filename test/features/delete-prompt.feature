Feature: Delete Prompt
  As a user
  I want to delete prompts I no longer need
  So that my list stays clean

  Background:
    Given I am logged in
    And a prompt exists with title "Prompt To Delete" body "This will be deleted" and tags "temp"

  Scenario: Delete a prompt from the home page
    When I open the home page
    And I delete "Prompt To Delete" from the list
    Then I should not see "Prompt To Delete" in the prompt list

  Scenario: Delete a prompt from the detail page
    When I open the home page
    And I click on "Prompt To Delete"
    And I click the Delete button on the detail page
    Then I should be redirected to the home page
    And I should not see "Prompt To Delete" in the prompt list
