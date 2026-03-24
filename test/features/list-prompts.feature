Feature: List Prompts
  As a user
  I want to view, search, and filter my prompts
  So that I can quickly find the one I need

  Background:
    Given I am logged in
    And a prompt exists with title "Python Script" body "Generate a Python hello world" and tags "python,coding"
    And a prompt exists with title "Email Draft" body "Write a professional email" and tags "writing,email"

  Scenario: View all prompts on the home page
    When I open the home page
    Then I should see "Python Script" in the prompt list
    And I should see "Email Draft" in the prompt list

  Scenario: Search prompts by keyword
    When I open the home page
    And I search for "Python"
    Then I should see "Python Script" in the prompt list
    And I should not see "Email Draft" in the prompt list

  Scenario: Filter prompts by tag
    When I open the home page
    And I click the tag "python"
    Then I should see "Python Script" in the prompt list
    And I should not see "Email Draft" in the prompt list

  Scenario: Clear search returns all prompts
    When I open the home page
    And I search for "Python"
    And I click the clear filter link
    Then I should see "Python Script" in the prompt list
    And I should see "Email Draft" in the prompt list
