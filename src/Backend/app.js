//jshint esversion:6
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const findOneOrCreate = require("mongoose-find-one-or-create");
const stripe = require("stripe")(
  "sk_test_51IaDoPSBIwLEOkGjhR9V52uPmofc79y1gnhSAZvSGyD57aMLL0C0OAtxLY6q7pujUJoYAdXHdUg85wmCm4hkkgZE008CaCiQp7"
);
const uuid = require("uuid");

// ----------Reuire end

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret-code",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ---------middlewares end

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set("useCreateIndex", true);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connetion established.");
});
// -------connection

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    dropDups: true,
  },
  username: {
    type: String,
    unique: true,
    dropDups: true,
  },
  password: String,
  userType: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const itemSchema = new mongoose.Schema({
  imgPath: {
    type: String,
    required: true,
  },
  shopId: String,
  imgData: String,
  name: String,
  price: String,
  rating: Number,
  category: String,
  timed: Boolean,
  from: String,
  to: String,
  status: String,
});

const Item = new mongoose.model("Item", itemSchema);

// ------------- ROUTES

app.get("/", (req, res) => {
  res.send(req.user);
});

// ------------------- Items route

app
  .route("/items")

  .get((req, res) => {
    Item.find({}, (err, data) => {
      err ? console.log(err) : res.send(data);
    });
  })

  .post((req, res) => {
    const {
      shopId,
      imgData,
      name,
      price,
      category,
      timed,
      from,
      to,
      status,
    } = req.body;

    if (!req.files) {
      return res.status(400).send("Please select pizza image.");
    } else if ((!imgData, !name, !price, !category, !status)) {
      return res.status(402).send("Please fill all the required field.");
    }

    const file = req.files.imgData;

    file.mv(`${__dirname}../../../public/uploads/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      const oneItem = new Item({
        shopId: shopId,
        imgPath: `/uploads/${file.name}`,
        imgData: imgData,
        name: name,
        price: price,
        rating: 0,
        category: category,
        timed: timed,
        from: from,
        to: to,
        status: status,
      });

      oneItem.save((err) =>
        err ? console.log(err) : console.log("inserted successfully")
      );
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  })

  .put((req, res) => {
    const { id, name, price, category, timed, status } = req.body;

    Item.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        price: price,
        category: category,
        timed: timed,
        status: status,
      },
      (err) => {
        !err ? console.log("Successfully Updated " + name) : console.log(err);
      }
    ).then((doc) => {
      res.status(201).send(doc);
    });
  })

  .delete((req, res) => {
    const { id } = req.body;
    Item.findByIdAndRemove({ _id: id }).then((doc) => {
      console.log(doc);
      res.send(doc);
    });
  });

// ----------------------------------- For Customer

app
  .route("/cart")
  .get((req, res) => {
    console.log(req.body.itemId);
  })
  .post((req, res) => {
    console.log(req.body.itemId);
    Item.findById(req.body.itemId).then((doc) => {
      res.send(doc);
    });
  });

//

app
  .route("/register")

  .get((req, res) => {
    console.log("get route log");
  })

  .post((req, res) => {
    User.register(
      {
        username: req.body.username,
        email: req.body.email,
        userType: req.body.userType,
      },
      req.body.password,
      (err, user) => {
        err
          ? res.status(404).send("Please fill all the details")
          : passport.authenticate("local")(req, res, () => {
              res.status(200).send("User Created.");
            });
      }
    );
  });

app
  .route("/login")
  .get((req, res) => {
    res.send("Login route...");
  })

  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(user, (err) => {
      err
        ? console.log(err)
        : passport.authenticate("local")(req, res, () => {
            res.status(200).send(req.user);
          });
    });
  });

app.get("/user", (req, res) => {
  const { _id, email, username, userType } = req.user;
  res.send({
    id: _id,
    email: email,
    name: username,
    userType: userType,
  });
});
// ---- USER END

const socialSchema = new mongoose.Schema({
  shopId: String,
  fb: String,
  insta: String,
  twt: String,
  pin: String,
});

socialSchema.plugin(findOneOrCreate);
const Social = new mongoose.model("Social", socialSchema);

app.get("/settings/socials", (req, res) => {
  res.send("/settings/socials has nothing to return. :/");
});

app.post("/settings/socials", (req, res) => {
  const { shopId, fb, insta, twt, pin } = req.body;

  Social.findOneOrCreate(
    { shopId: shopId },
    {
      shopId: shopId,
      fb: fb,
      insta: insta,
      twt: twt,
      pin: pin,
    },
    (err, data) => {
      err ? res.send(err.message) : res.send(data);
    }
  );
});

app.put("/settings/socials", (req, res) => {
  const { shopId, fb, insta, twt, pin } = req.body;

  console.log(req.body.fb);
  Social.findOneAndUpdate(
    { shopId: shopId },
    {
      shopId: shopId,
      fb: fb,
      insta: insta,
      twt: twt,
      pin: pin,
    },
    (err) => {
      !err ? console.log("Successfully Updated ") : console.log(err);
    }
  );
});

// ------ SOCIAL MEDIA DETAIL END

const shopDetailSchema = new mongoose.Schema({
  shopId: String,
  shopName: String,
  gst: String,
  shopEmail: String,
  contact: String,
  addr1: String,
  addr2: String,
});

shopDetailSchema.plugin(findOneOrCreate);
const ShopDetail = new mongoose.model("ShopDetail", shopDetailSchema);

app.get("/settings/shop-detail", (req, res) => {
  res.send("/settings/socials has nothing to return. :/");
});

app.post("/settings/shop-detail", (req, res) => {
  const { shopId, shopName, gst, shopEmail, contact, addr1, addr2 } = req.body;

  ShopDetail.findOneOrCreate(
    { shopId: shopId },
    {
      shopId: shopId,
      shopName: shopName,
      gst: gst,
      shopEmail: shopEmail,
      contact: contact,
      addr1: addr1,
      addr2: addr2,
    },
    (err, data) => {
      err ? res.send(err.message) : res.send(data);
    }
  );
});

app.put("/settings/shop-detail", (req, res) => {
  const { shopId, shopName, gst, shopEmail, contact, addr1, addr2 } = req.body;

  console.log(req.body.fb);
  ShopDetail.findOneAndUpdate(
    { shopId: shopId },
    {
      shopId: shopId,
      shopName: shopName,
      gst: gst,
      shopEmail: shopEmail,
      contact: contact,
      addr1: addr1,
      addr2: addr2,
    },
    (err) => {
      !err ? console.log("Successfully Updated ") : console.log(err);
    }
  );
});
// ------ SHOP DETAIL END

const personalSchema = new mongoose.Schema({
  shopId: String,
  name: String,
  email: String,
  contact: String,
});

personalSchema.plugin(findOneOrCreate);
const PersDetail = new mongoose.model("PersDetail", personalSchema);

app.get("/settings/shop-personal", (req, res) => {
  res.send("/settings/socials has nothing to return. :/");
});

app.post("/settings/shop-personal", (req, res) => {
  const { shopId, name, email, contact } = req.body;

  PersDetail.findOneOrCreate(
    { shopId: shopId },
    {
      shopId: shopId,
      name: name,
      email: email,
      contact: contact,
    },
    (err, data) => {
      err ? res.send(err.message) : res.send(data);
    }
  );
});

app.put("/settings/shop-personal", (req, res) => {
  const { shopId, name, email, contact } = req.body;

  console.log(req.body.fb);
  PersDetail.findOneAndUpdate(
    { shopId: shopId },
    {
      shopId: shopId,
      name: name,
      email: email,
      contact: contact,
    },
    (err) => {
      !err ? res.send("Successfully Updated ") : console.log(err);
    }
  );
});

app.post("/create-shop", (req, res) => {
  const { shopId, ShopData, CredentialData, PersonalData } = req.body;
  console.log(req.body);

  User.findOneAndUpdate({ _id: shopId }, { userType: "shop" }, (err) => {
    !err ? null : console.log(err);
  });
  ShopDetail.findOneOrCreate(
    { shopId: shopId },
    {
      shopId: shopId,
      shopName: ShopData.shopName,
      gst: ShopData.gst,
      shopEmail: ShopData.shopEmail,
      contact: ShopData.shopPhone,
      addr1: ShopData.shopAddress1,
      addr2: ShopData.shopAddress2,
    },
    (err, data) => {
      err ? res.send(err.message) : null;
    }
  );
  PersDetail.findOneOrCreate(
    { shopId: shopId },
    {
      shopId: shopId,
      name: PersonalData.ownerName,
      email: PersonalData.email,
      contact: PersonalData.phone,
    },
    (err, data) => {
      err ? res.send(err.message) : res.send("recieved");
    }
  );

  // res.send("recieved.");
});

//  ---- PAYMENT ROUTE

const transactionSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  customerName: String,
  productId: {
    type: String,
    required: true,
  },
  productShopId: {
    type: String,
    required: true,
  },
  productName: String,
  amount: String,
  transactionId: String,
  transactionStatus: String,
  date: String,
  time: String
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.post("/payment", async (req, res) => {
  try {
    const { products, token } = req.body;

    // ---- Stripe
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = new Date().getTime().toString();

    products.map(async (product) => {
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        {
          idempotencyKey,
        }
      );
      console.log("Charge", { charge });

      // Transaction document
      const today = new Date();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const currentTime = h + ":" + m + ":" + s;

      const newTransaction = new Transaction({
        customerId: product.userId,
        customerName: product.userName,
        productId: product.itemId,
        productShopId: product.shopId,
        productName: product.name,
        amount: product.price,
        transactionId: charge.id,
        transactionStatus: charge.status,
        date: new Date().toLocaleDateString("en-IN"),
        time: currentTime,
      });

      newTransaction.save((err, doc) => {
        !err ? console.log("Success") : console.log(err);
      });
    });

    res.status(200).send("Success");
  } catch (error) {
    console.log("Error:", error);
    status = "failure";
  }
});

app.get("/transactions", (req, res) => {
  Transaction.find({}, (err, data) => {
    err ? console.log(err) : res.send(data);
  });
});

app.listen(4000, function () {
  console.log("server started on port 4000.");
});
