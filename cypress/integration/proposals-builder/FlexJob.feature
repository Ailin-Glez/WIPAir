Feature: Flex Job tests

    Background:
        Given I am on the Proposals screen
        And I have selected a Flex Job and category

    Scenario: Check that a Flex Job can be included in All Proposals
        When I click on the Include All button
        Then the Flex Job selected is included successfully in all Proposals

    Scenario: Check that I can delete a Flex Job previoulsy added
        When I include a Flex Job in the "Best" Proposal
        And I delete the added Flex Job
        Then the Flex Job added is deleted from the "Best" Proposal

    Scenario: Check that I can Recommend a Flex Job only if the Proposal has a Flex Job
        Given all the Recommend buttons are disabled since the Proposals haven't a Flex Job added
        When I include a Flex Job in the "Best" Proposal
        Then the Recommend button for the Proposal added is enabled
        But the Recommend buttons for other Proposals remain disabled

    Scenario: Check that I can Customize the price of a Flex Job
        When I click in Customize button and change the price
        Then the price is adjusted in the Flex Job card
        And the customized price is reflected in all Proposals after the addition

