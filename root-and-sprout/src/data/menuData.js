export const CUISINES = [
    { id: 'indian', label: 'Indian' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'fastfood', label: 'Fast Food' },
    { id: 'sweets', label: 'Sweets' },
    { id: 'soups', label: 'Soups' },
    { id: 'sides', label: 'Sides' },
    { id: 'beverages', label: 'Beverages' }
];

export const MENU_DATA = {
    indian: {
        categories: [
            { id: 'starters', label: 'Starters' },
            { id: 'mains', label: 'Main Course' },
            { id: 'breads', label: 'Breads & Rice' }
        ],
        items: {
            starters: [
                {
                    id: 'ind_s1',
                    title: "Paneer Tikka",
                    description: "Chunks of fresh cottage cheese marinated in spiced yogurt and grilled to perfection.",
                    price: "249",
                    tags: ["V", "GF"],
                    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2034&auto=format&fit=crop"
                },
                {
                    id: 'ind_s2',
                    title: "Samosa Chaat",
                    description: "Crushed crispy samosas topped with tangy tamarind chutney, yogurt, and spices.",
                    price: "149",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop"
                },
                {
                    id: 'ind_s3',
                    title: "Hara Bhara Kebab",
                    description: "Delicious spinach and green pea patties, pan-fried.",
                    price: "199",
                    tags: ["V", "VG"],
                    image: "/img/menu/hara-bhara-kebab.png"
                },
                {
                    id: 'ind_s4',
                    title: "Dahi Puri",
                    description: "Crispy puffed shells stuffed with potatoes, yogurt, tamarind and mint chutneys.",
                    price: "129",
                    tags: ["V"],
                    image: "/img/menu/dahi-puri.png"
                },
                {
                    id: 'ind_s5',
                    title: "Paneer 65",
                    description: "Deep-fried paneer cubes tossed in spicy red chili sauce and curry leaves.",
                    price: "229",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1974&auto=format&fit=crop"
                }
            ],
            mains: [
                {
                    id: 'ind_m1',
                    title: "Butter Chicken",
                    description: "Tender chicken cooked in a rich, creamy tomato and cashew gravy.",
                    price: "349",
                    tags: ["GF"],
                    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop"
                },
                {
                    id: 'ind_m2',
                    title: "Paneer Butter Masala",
                    description: "Soft paneer cubes simmered in a buttery, mildly spiced tomato gravy.",
                    price: "299",
                    tags: ["V", "GF"],
                    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop"
                },
                {
                    id: 'ind_m3',
                    title: "Dal Makhani",
                    description: "Rich black lentils slow-cooked overnight with butter and cream.",
                    price: "249",
                    tags: ["V", "GF"],
                    image: "/img/menu/dal-makhani.png"
                },
                {
                    id: 'ind_m4',
                    title: "Palak Paneer",
                    description: "Cottage cheese cubes in a smooth spinach puree seasoned with garlic and ginger.",
                    price: "289",
                    tags: ["V", "GF"],
                    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?q=80&w=2072&auto=format&fit=crop"
                },
                {
                    id: 'ind_m5',
                    title: "Veg Biryani",
                    description: "Aromatic basmati rice cooked with mixed vegetables and whole spices.",
                    price: "269",
                    tags: ["V", "GF"],
                    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2010&auto=format&fit=crop"
                },
                {
                    id: 'ind_m6',
                    title: "Pav Bhaji",
                    description: "Spiced mashed vegetable curry served with buttery toasted pav bread.",
                    price: "179",
                    tags: ["V"],
                    image: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
            ],
            breads: [
                {
                    id: 'ind_b1',
                    title: "Garlic Naan",
                    description: "Leavened flatbread topped with minced garlic and butter.",
                    price: "49",
                    tags: ["V"],
                    image: "/img/menu/garlic-naan.png"
                },
                {
                    id: 'ind_b2',
                    title: "Jeera Rice",
                    description: "Fragrant basmati rice tempered with cumin seeds.",
                    price: "149",
                    tags: ["V", "VG", "GF"],
                    image: "/img/menu/jeera-rice.png"
                },
                {
                    id: 'ind_b3',
                    title: "Butter Naan",
                    description: "Soft and fluffy leavened bread brushed with generous butter.",
                    price: "45",
                    tags: ["V"],
                    image: "/img/menu/butter-naan.png"
                },
                {
                    id: 'ind_b4',
                    title: "Tandoori Roti",
                    description: "Whole wheat bread baked in a clay oven.",
                    price: "35",
                    tags: ["V", "VG"],
                    image: "/img/menu/tandoori-roti.png"
                },
                {
                    id: 'ind_b5',
                    title: "Hyderabadi Chicken Biryani",
                    description: "World-famous basmati rice dish cooked with marinated chicken, saffron, and aromatic spices.",
                    price: "349",
                    tags: ["GF"],
                    image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800"
                },
                {
                    id: 'ind_b6',
                    title: "Special Veg Biryani",
                    description: "Aromatic basmati rice cooked with fresh assorted vegetables, paneer, and exotic spices.",
                    price: "299",
                    tags: ["V", "GF"],
                    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=2070&auto=format&fit=crop"
                },
                {
                    id: 'ind_b7',
                    title: "Mutton Biryani",
                    description: "Slow-cooked tender mutton layered with fragrant long-grain rice and fried onions.",
                    price: "449",
                    tags: ["GF"],
                    image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=800"
                },

            ]
        }
    },
    chinese: {
        categories: [
            { id: 'starters', label: 'Starters' },
            { id: 'mains', label: 'Main Course' }
        ],
        items: {
            starters: [
                {
                    id: 'chi_s1',
                    title: "Veg Spring Rolls",
                    description: "Crispy rolls filled with shredded vegetables, served with sweet chili sauce.",
                    price: "199",
                    tags: ["V"],
                    image: "/img/menu/veg-spring-rolls.png"
                },
                {
                    id: 'chi_s2',
                    title: "Chilli Paneer Dry",
                    description: "Battered paneer cubes tossed with onions, peppers, and spicy soya sauce.",
                    price: "249",
                    tags: ["V"],
                    image: "/img/menu/chilli-paneer-dry.png"
                },
                {
                    id: 'chi_s3',
                    title: "Veg Manchurian",
                    description: "Vegetable dumplings tossed in a savory garlic and soya sauce.",
                    price: "229",
                    tags: ["V"],
                    image: "/img/menu/veg-manchurian.png"
                },
                {
                    id: 'chi_s4',
                    title: "Honey Chilli Potato",
                    description: "Crispy fried potato fingers coated in honey chilli sauce.",
                    price: "189",
                    tags: ["V"],
                    image: "/img/menu/honey-chilli-potato.png"
                },
                {
                    id: 'chi_s5',
                    title: "Veg Momos (Steam)",
                    description: "Steamed dumplings filled with minced vegetables, served with spicy chutney.",
                    price: "149",
                    tags: ["V"],
                    image: "/img/menu/veg-momos.png"
                }
            ],
            mains: [
                {
                    id: 'chi_m1',
                    title: "Hakka Noodles",
                    description: "Stir-fried noodles with crunchy vegetables and mild spices.",
                    price: "219",
                    tags: ["V"],
                    image: "/img/menu/hakka-noodles.png"
                },
                {
                    id: 'chi_m2',
                    title: "Veg Fried Rice",
                    description: "Classic stir-fried rice with assorted vegetables.",
                    price: "199",
                    tags: ["V", "GF"],
                    image: "/img/menu/veg-fried-rice.png"
                },
                {
                    id: 'chi_m3',
                    title: "Schezwan Chicken",
                    description: "Chicken tossed in spicy Schezwan sauce with peppers.",
                    price: "279",
                    tags: [],
                    image: "/img/menu/schezwan-chicken.png"
                },
                {
                    id: 'chi_m4',
                    title: "American Chopsuey",
                    description: "Crispy noodles topped with sweet and sour vegetable gravy and a fried egg.",
                    price: "259",
                    tags: [],
                    image: "/img/menu/american-chopsuey.png"
                }
            ]
        }
    },
    fastfood: {
        categories: [
            { id: 'burgers_wraps', label: 'Burgers & Wraps' },
            { id: 'pizza_pasta', label: 'Pizza & Pasta' }
        ],
        items: {
            burgers_wraps: [
                {
                    id: 'ff_b1',
                    title: "Classic Veggie Burger",
                    description: "Crispy potato patty with lettuce, tomato, cheese and house dressing.",
                    price: "129",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=1990&auto=format&fit=crop"
                },
                {
                    id: 'ff_b2',
                    title: "Paneer Tikka Wrap",
                    description: "Grilled paneer and veggies wrapped in a soft tortilla with mint chutney.",
                    price: "159",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=2028&auto=format&fit=crop"
                },
                {
                    id: 'ff_b3',
                    title: "Cheese Melt Sandwich",
                    description: "Grilled sandwich loaded with mozzarella and cheddar cheese.",
                    price: "139",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?q=80&w=2069&auto=format&fit=crop"
                },
                {
                    id: 'ff_b4',
                    title: "Spicy Chicken Burger",
                    description: "Fried chicken fillet with spicy mayo and pickles.",
                    price: "179",
                    tags: [],
                    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop"
                },
                {
                    id: 'ff_b5',
                    title: "French Fries",
                    description: "Classic salted crispy potato fries.",
                    price: "99",
                    tags: ["V", "VG", "GF"],
                    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1925&auto=format&fit=crop"
                }
            ],
            pizza_pasta: [
                {
                    id: 'ff_p1',
                    title: "Margherita Pizza",
                    description: "Classic tomato sauce, mozzarella cheese, and fresh basil.",
                    price: "299",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop"
                },
                {
                    id: 'ff_p2',
                    title: "Farmhouse Pizza",
                    description: "Loaded with onions, capsicum, tomato, and corn.",
                    price: "349",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop"
                },
                {
                    id: 'ff_p3',
                    title: "White Sauce Pasta",
                    description: "Penne pasta in creamy béchamel sauce with broccoli and mushrooms.",
                    price: "249",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=2070&auto=format&fit=crop"
                },
                {
                    id: 'ff_p4',
                    title: "Red Sauce Pasta",
                    description: "Fusilli pasta tossed in tangy arrabbiata sauce with olives.",
                    price: "239",
                    tags: ["V", "VG"],
                    image: "/img/menu/red-sauce-pasta.png"
                }
            ]
        }
    },
    sweets: {
        categories: [
            { id: 'indian_sweets', label: 'Indian Sweets' },
            { id: 'desserts', label: 'Desserts' }
        ],
        items: {
            indian_sweets: [
                {
                    id: 'swt_i1',
                    title: "Gulab Jamun (2 pcs)",
                    description: "Fried milk solids soaked in saffron sugar syrup, served warm.",
                    price: "99",
                    tags: ["V"],
                    image: "/img/menu/gulab-jamun.png"
                },
                {
                    id: 'swt_i2',
                    title: "Rasmalai (2 pcs)",
                    description: "Soft cottage cheese patties in thickened sweet milk.",
                    price: "119",
                    tags: ["V"],
                    image: "/img/menu/rasmalai.png"
                },
                {
                    id: 'swt_i3',
                    title: "Gajar Ka Halwa",
                    description: "Classic carrot pudding cooked with milk, ghee, and nuts.",
                    price: "129",
                    tags: ["V", "GF"],
                    image: "/img/menu/gajar-halwa.png"
                }
            ],
            desserts: [
                {
                    id: 'swt_d1',
                    title: "Sizzling Brownie",
                    description: "Hot walnut brownie served with vanilla ice cream and chocolate sauce.",
                    price: "199",
                    tags: ["V"],
                    image: "/img/menu/sizzling-brownie.png"
                },
                {
                    id: 'swt_d2',
                    title: "Vanilla Ice Cream",
                    description: "Classic creamy vanilla bean ice cream (2 scoops).",
                    price: "89",
                    tags: ["V", "GF"],
                    image: "/img/menu/vanilla-ice-cream.png"
                },
                {
                    id: 'swt_d3',
                    title: "New York Cheesecake",
                    description: "Rich and creamy cheesecake with a graham cracker crust.",
                    price: "249",
                    tags: ["V"],
                    image: "/img/menu/new-york-cheesecake.png"
                }
            ]
        }
    },
    soups: {
        categories: [
            { id: 'all_soups', label: 'All Soups' }
        ],
        items: {
            all_soups: [
                {
                    id: 'soup_1',
                    title: "Tomato Soup",
                    description: "Rich and creamy roasted tomato soup served with croutons.",
                    price: "129",
                    tags: ["V", "GF"],
                    image: "/img/menu/tomato-soup.png"
                },
                {
                    id: 'soup_2',
                    title: "Sweet Corn Veg Soup",
                    description: "Comforting soup with sweet corn kernels and mixed vegetables.",
                    price: "139",
                    tags: ["V", "VG"],
                    image: "/img/menu/sweet-corn-soup.png"
                },
                {
                    id: 'soup_3',
                    title: "Hot & Sour Soup",
                    description: "Spicy and tangy soup with bamboo shoots and mushrooms.",
                    price: "149",
                    tags: ["V", "VG"],
                    image: "/img/menu/hot-sour-soup.png"
                },
                {
                    id: 'soup_4',
                    title: "Manchow Soup",
                    description: "Popular Indo-Chinese spicy soup topped with fried noodles.",
                    price: "159",
                    tags: ["V", "VG"],
                    image: "/img/menu/manchow-soup.png"
                }
            ]
        }
    },
    sides: {
        categories: [
            { id: 'all_sides', label: 'All Sides' }
        ],
        items: {
            all_sides: [
                {
                    id: 'side_1',
                    title: "Roasted Papad",
                    description: "Crispy roasted lentil wafer.",
                    price: "25",
                    tags: ["V", "VG", "GF"],
                    image: "/img/menu/roasted-papad.png"
                },
                {
                    id: 'side_2',
                    title: "Masala Papad",
                    description: "Roasted papad topped with spicy onion and tomato mix.",
                    price: "59",
                    tags: ["V", "VG"],
                    image: "/img/menu/masala-papad.png"
                },
                {
                    id: 'side_3',
                    title: "Boondi Raita",
                    description: "Yogurt mixed with crispy chickpea flour pearls and spices.",
                    price: "89",
                    tags: ["V", "GF"],
                    image: "/img/menu/boondi-raita.png"
                },
                {
                    id: 'side_4',
                    title: "Green Salad",
                    description: "Freshly sliced cucumbers, tomatoes, carrots, and onions.",
                    price: "79",
                    tags: ["V", "VG", "GF"],
                    image: "/img/menu/green-salad.png"
                }
            ]
        }
    },
    beverages: {
        categories: [
            { id: 'cold', label: 'Cold Drinks' },
            { id: 'hot', label: 'Hot Drinks' }
        ],
        items: {
            cold: [
                {
                    id: 'bev_c1',
                    title: "Mango Lassi",
                    description: "Classic creamy mango yogurt drink.",
                    price: "99",
                    tags: ["V", "GF"],
                    image: "/img/menu/mango-lassi.png"
                },
                {
                    id: 'bev_c2',
                    title: "Masala Chaas",
                    description: "Spiced buttermilk with coriander and mint.",
                    price: "69",
                    tags: ["V", "GF"],
                    image: "/img/menu/masala-chaas.png"
                },
                {
                    id: 'bev_c3',
                    title: "Oreo Shake",
                    description: "Thick chocolate milkshake blended with Oreo cookies.",
                    price: "169",
                    tags: ["V"],
                    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1887&auto=format&fit=crop"
                },
                {
                    id: 'bev_c4',
                    title: "Lemon Iced Tea",
                    description: "Refreshing chilled tea with lemon and mint.",
                    price: "119",
                    tags: ["V", "VG", "GF"],
                    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964&auto=format&fit=crop"
                }
            ],
            hot: [
                {
                    id: 'bev_h1',
                    title: "Masala Chai",
                    description: "Indian spiced tea brewed with milk and ginger.",
                    price: "49",
                    tags: ["V", "GF"],
                    image: "/img/menu/masala-chai.png"
                },
                {
                    id: 'bev_h2',
                    title: "Filter Coffee",
                    description: "Traditional South Indian strong coffee.",
                    price: "59",
                    tags: ["V", "GF"],
                    image: "/img/menu/filter-coffee.png"
                }
            ]
        }
    }
};
