Feature: Accessories tests

    Scenario: Check that when selecting Accesoires only, the Proposals should be empty
        Given I have added Flex Jobs to the Proposals
        And I click on the Accessories Only button
        When a modal is displayed with the message: "In order to use Accessory Only all selected bundles will be removed from the consultation."
        And I click on the "Continue" button
        Then all the Proposals are removed
