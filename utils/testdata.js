const testData = {
  environments: {
    staging: {
      sourceURL: "https://www.saucedemo.com/v1/index.html",
      username: "standard_user",
      password: "secret_sauce",
      locked_username: "locked_out_user",
      locked_password: "secret_sauce",
      removeQuantity: 2,
      firstName: "Foo",
      lastName: "Bar",
      postalCode: "11111",
      singleProduct: ["Sauce Labs Bolt T-Shirt"],
      multipleProduct: ["Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie"
    ],
      randommultipleProduct: ["Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie"
    ]
    },
      production: {
        sourceURL: "abc.com",
        username: "",
        password: "",
        locked_username: "",
        locked_password: ""
    }
  }
};

module.exports = testData;