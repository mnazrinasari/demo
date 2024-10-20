Feature: Product sorting in PDP grid

  @only  
  Scenario: Verify Product grid sorting options
    Given Login and landing in product detail page
    Then Verify product grid is sorted alphabetically ascending by default
    Then Sort product grid to alphabetically descending
    And Verify product grid is sorted alphabetically descending
    Then Sort product grid to numerically ascending
    And Verify product grid is sorted numerically ascending
    Then Sort product grid to numerically descending
    And Verify product grid is sorted numerically descending
    Then Sort product grid to alphabetically ascending
    And Verify product grid is sorted alphabetically ascending