const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const { ID, Query } = require("node-appwrite");
const { Users, Account, Database } = require("./appwrite");
require("cross-fetch/polyfill");

const app = express();

app.use(cors());

// config Express.js
app.use(express.json());
app.set("port", 3000);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");

  next();
});

app.get("/api/restaurants", (req, res) => {
  const { query } = req;

  let url = `https://www.swiggy.com/dapi/restaurants/list/v5?`;

  Object.keys(query).map((key, index) => {
    url += `${key}=${query[key]}`;
    if (index < Object.keys(query).length - 1) {
      url += "&";
    }
  });

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        res.status(500).json({ message: "Network response was not ok" });
        return;
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.get("/api/search", (req, res) => {
  const { search } = req.query;
  fetch(
    `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${search}&types=`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        res.status(500).json({ message: "Network response was not ok" });
        return;
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.get("/api/address", (req, res) => {
  const { place_id, latlng } = req.query;
  const urlQuery = place_id ? `place_id=${place_id}` : `latlng=${latlng}`;

  fetch(`https://www.swiggy.com/dapi/misc/address-recommend?${urlQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        res.status(500).json({ message: "Network response was not ok" });
        return;
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});
app.get("/api/search_restaurants", (req, res) => {
  const { lat, lng, str } = req.query;

  fetch(
    `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${str}&trackingId=undefined`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        res.status(500).json({ message: "Network response was not ok" });
        return;
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.get("/api/pre_search", (req, res) => {
  const { lat, lng } = req.query;

  fetch(
    `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        res.status(500).json({ message: "Network response was not ok" });
        return;
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.get("/api/single_restaurant", (req, res) => {
  const { lat, lng, str } = req.query;

  fetch(
    `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${str}&submitAction=ENTER`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        res.status(500).json({ message: "Network response was not ok" });
        return;
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.get("/api/searched_restaurant", (req, res) => {
  const { lat, lng, restaurantId, query } = req.query;

  fetch(
    `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&query=${query}&submitAction=SUGGESTION`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        res.status(500).json({ message: "Network response was not ok" });
        return;
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.post("/api/update", (req, res) => {
  fetch(`https://www.swiggy.com/dapi/restaurants/list/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    },
    body: JSON.stringify(req.body.data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.post("/api/create_user", async (req, res) => {
  const { name, email, phone, updatedUser } = req.body;

  if (!email || !name || !phone || phone.length !== 10) {
    throw new Error("Body is Invalid!");
  }

  try {
    const user = await Users.get(updatedUser.userId);
    if (user && user.phoneVerification && !user.email && !user.name) {
      const collectionID = ID.unique();
      const p1 = await Users.updateName(user["$id"], name);
      const p2 = await Users.updateEmail(user["$id"], email);
      const p3 = await Database.createCollection(
        "6515cb17e04d0249b90c",
        collectionID,
        user["$id"]
      );
      await Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => {
        res.status(200).json({
          message: "success",
          user: {
            ...r1,
            ...r2,
            fullyUpdated: true,
            database: r3["$id"],
          },
        });
      });
    } else {
      res.status(401).json({ message: "user already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { phone, updatedUser } = req.body;

  if (!phone || phone.length !== 10 || !updatedUser) {
    throw new Error("Body is Invalid!");
  }

  try {
    const user = await Users.get(updatedUser.userId);
    if (user.phoneVerification && user.name) {
      res.status(200).json({
        message: "success",
        user: { ...user, success: true },
      });
    } else {
      await Users.delete(updatedUser.userId);
      res.status(401).json({ message: "user does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/addToCart", async (req, res) => {
  const { cart, number, database, userId } = req.body;

  if (!cart || !number) {
    res.status(500).json({ message: "Body is Invalid!" });
    return;
  }

  try {
    const findDoc = await Database.listDocuments(
      "6515cb17e04d0249b90c",
      database
    );
    if (findDoc.documents.length === 0) {
      console.log(database, cart);
      const newDoc = await Database.createDocument(
        "6515cb17e04d0249b90c",
        database,
        ID.unique(),
        {
          id: cart.id,
          name: cart.name,
          price: parseInt(cart.price / 100, 10),
          quantity: 1,
          parentId: cart.restaurantId,
        }
      );

      res.status(200).json({ message: "successfull", item: newDoc });
    } else {
      const parentId = findDoc.documents[0].parentId;
      if (parentId !== cart.parentId) {
        const promises = [];
        findDoc.documents.forEach(async (doc) => {
          const p = await Database.deleteDocument(
            "6515cb17e04d0249b90c",
            database,
            doc["$id"]
          );
          promises.push(p);
        });

        await Promise.all(promises).then(async () => {
          const newDoc = await Database.createDocument(
            "6515cb17e04d0249b90c",
            database,
            ID.unique(),
            {
              id: cart.id,
              name: cart.name,
              price: cart.price,
              quantity: 1,
              parentId: cart.restaurantId,
            }
          );
          res.status(200).json({ message: "successfull", item: newDoc });
        });
      } else {
        const product = findDoc.documents.filter(
          (item) => item["$id"] === cart.id
        );

        if (product.length > 0) {
          console.log(product);
          const newDoc = await Database.updateDocument(
            "6515cb17e04d0249b90c",
            database
          );
        } else {
          const newDoc = await Database.createDocument(
            "6515cb17e04d0249b90c",
            database,
            ID.unique(),
            {
              id: cart.id,
              name: cart.name,
              price: cart.price,
              quantity: 1,
              parentId: cart.restaurantId,
            }
          );

          res.status(200).json({ message: "successfull", item: newDoc });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(8000, () => {
  console.log("connected on PORT 8000");
});
