Feature: Verify the products page

  Background: common steps for each scenario
    Given user is on products page    

  Scenario: To verify the products count in products page
    Given user is on products page
    Then The number of products should be as expected

  Scenario: To Sort products by price low to high
    Given user is on products page
    When Sort products by price low to high
    Then the products should be sorted by price

  Scenario: To add a product to cart
    Given user is on products page
    When add a products to cart
    And user is on cart page
    Then the product should be added to cart

   Scenario: To remove a product from cart
    And user is on products page
    When add a products to cart
    Given user is on cart page
    When remove the product from cart
    Then the product should be removed from cart

