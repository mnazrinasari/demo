Feature: Complete Order Flow

  Scenario: Complete order flow with a single product
    Given Login and landing in product detail page
    Then Click add single product to cart
    And Verify product is added to cart
    Then Click view cart
    And Verify product is in the cart page
    Then Click checkout
    And Enter the checkout details
    And Click continue to order
    Then Verify products is in the order review page
    And Verify Order ID
    And Click Finish
    Then Verify thank you page is displayed

Scenario: Complete order flow with multiple product
    Given Login and landing in product detail page
    Then Click add multiple product to cart
    And Verify product is added to cart
    Then Click view cart
    And Verify product is in the cart page
    Then Click checkout
    And Enter the checkout details
    And Click continue to order
    Then Verify products is in the order review page
    And Verify Order ID
    And Click Finish
    Then Verify thank you page is displayed

Scenario: Verify Order Amount in Complete order flow 
    Given Login and landing in product detail page
    Then Click add multiple product to cart
    Then Verify total amount of product added to cart
    Then Click view cart
    Then Verify Cart Amount
    And Navigate to checkout
    And Navigate to order review
    Then Verify total amount in order review page

Scenario: Verify product display according to adding to cart sequence
    Given Login and landing in product detail page
    Then Click add multiple product to cart by random sequence
    And Verify product display order in View Cart
    Then Navigate checkout and to order review
    And Verify product display order in View Cart in order review page

