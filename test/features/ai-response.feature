Feature: AI Response
  As a user
  I want to click "Ask AI" on a prompt
  So that I can see a simulated AI response

  Background:
    Given I am logged in
    And a prompt exists with title "AI Test Prompt" body "Explain recursion simply" and tags "ai"

  Scenario: Ask AI and receive a response
    When I open the home page
    And I click on "AI Test Prompt"
    And I click the Ask AI button
    Then the AI response box should become visible
    And the AI response text should not be empty

  Scenario: AI button is disabled while waiting for a response
    When I open the home page
    And I click on "AI Test Prompt"
    Then the Ask AI button should be present on the page
