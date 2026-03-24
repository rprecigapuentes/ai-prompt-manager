Feature: Create Prompt
  As a user
  I want to create new prompts
  So that I can save and reuse them later

  Background:
    Given I am logged in

  Scenario: Successfully create a prompt with all fields
    When I navigate to the new prompt page
    And I fill in the title with "Test Automation Prompt"
    And I fill in the body with "Write a test plan for a login feature"
    And I fill in the tags with "testing, automation"
    And I click Save Prompt
    Then I should be redirected to the home page
    And I should see "Test Automation Prompt" in the prompt list

  Scenario: Create a prompt without tags
    When I navigate to the new prompt page
    And I fill in the title with "Minimal Prompt"
    And I fill in the body with "This prompt has no tags"
    And I click Save Prompt
    Then I should be redirected to the home page
    And I should see "Minimal Prompt" in the prompt list

  Scenario: Fail to create a prompt without a title
    When I navigate to the new prompt page
    And I fill in the body with "Body without a title"
    And I click Save Prompt
    Then I should see an error message on the create page
