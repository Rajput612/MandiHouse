#!/bin/bash

# Create images directory if it doesn't exist
cd "$(dirname "$0")/.."
BASE_DIR="public/images/products"

# Download vegetables images
curl -L -o "${BASE_DIR}/vegetables/tomatoes.jpg" "https://images.unsplash.com/photo-1546470427-0d4db154cba8?w=800&q=80"
curl -L -o "${BASE_DIR}/vegetables/spinach.jpg" "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80"
curl -L -o "${BASE_DIR}/vegetables/onions.jpg" "https://images.unsplash.com/photo-1618512496248-a01b66e13a86?w=800&q=80"

# Download fruits images
curl -L -o "${BASE_DIR}/fruits/mango.jpg" "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80"
curl -L -o "${BASE_DIR}/fruits/apple.jpg" "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80"
curl -L -o "${BASE_DIR}/fruits/banana.jpg" "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80"

# Download fish images
curl -L -o "${BASE_DIR}/fish/rohu.jpg" "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&q=80"
curl -L -o "${BASE_DIR}/fish/pomfret.jpg" "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&q=80"
curl -L -o "${BASE_DIR}/fish/prawns.jpg" "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80"

# Download seeds images
curl -L -o "${BASE_DIR}/seeds/sunflower.jpg" "https://images.unsplash.com/photo-1508105859382-b487af436eff?w=800&q=80"
curl -L -o "${BASE_DIR}/seeds/flax.jpg" "https://images.unsplash.com/photo-1595878715977-2e4a09a81c86?w=800&q=80"

# Download herbs images
curl -L -o "${BASE_DIR}/herbs/coriander.jpg" "https://images.unsplash.com/photo-1600546707672-6c884ca1c94f?w=800&q=80"
curl -L -o "${BASE_DIR}/herbs/mint.jpg" "https://images.unsplash.com/photo-1628557010295-ddd58723c1c5?w=800&q=80"

# Download spices images
curl -L -o "${BASE_DIR}/spices/chilli.jpg" "https://images.unsplash.com/photo-1628924172947-143135d2407f?w=800&q=80"
curl -L -o "${BASE_DIR}/spices/turmeric.jpg" "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80"

# Download dairy images
curl -L -o "${BASE_DIR}/dairy/paneer.jpg" "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80"
curl -L -o "${BASE_DIR}/dairy/curd.jpg" "https://images.unsplash.com/photo-1558725101-a32cc5859c88?w=800&q=80"

# Download groceries images
curl -L -o "${BASE_DIR}/groceries/toor-dal.jpg" "https://images.unsplash.com/photo-1585996950364-1f0b83d70a2f?w=800&q=80"
curl -L -o "${BASE_DIR}/groceries/basmati-rice.jpg" "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80"
