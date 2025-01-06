const db = require('../models');
const Users = db.users;

const Budgets = db.budgets;

const Events = db.events;

const Guests = db.guests;

const Vendors = db.vendors;

const Venues = db.venues;

const Organizations = db.organizations;

const BudgetsData = [
  {
    total_budget: 43.72,

    expenses: 39.57,

    income: 39.23,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    total_budget: 75.34,

    expenses: 86.45,

    income: 82.61,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    total_budget: 66.77,

    expenses: 49.97,

    income: 89.36,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const EventsData = [
  {
    title: 'Jonas Salk',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Wilhelm Wundt',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Albrecht von Haller',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const GuestsData = [
  {
    name: 'Leonard Euler',

    meal_preference: 'Vegan',

    rsvp_status: true,

    // type code here for "relation_one" field
  },

  {
    name: 'John Dalton',

    meal_preference: 'Vegetarian',

    rsvp_status: true,

    // type code here for "relation_one" field
  },

  {
    name: 'Alfred Kinsey',

    meal_preference: 'Vegan',

    rsvp_status: false,

    // type code here for "relation_one" field
  },
];

const VendorsData = [
  {
    name: 'Linus Pauling',

    contact_info: 'James Watson',

    rating: 21.74,

    // type code here for "relation_one" field
  },

  {
    name: 'Claude Bernard',

    contact_info: 'Marie Curie',

    rating: 77.07,

    // type code here for "relation_one" field
  },

  {
    name: 'George Gaylord Simpson',

    contact_info: 'Thomas Hunt Morgan',

    rating: 53.26,

    // type code here for "relation_one" field
  },
];

const VenuesData = [
  {
    name: 'Alexander Fleming',

    location: 'Edwin Hubble',

    capacity: 8,

    is_booked: true,

    // type code here for "relation_one" field
  },

  {
    name: 'Ernst Haeckel',

    location: 'Ludwig Boltzmann',

    capacity: 4,

    is_booked: false,

    // type code here for "relation_one" field
  },

  {
    name: 'Karl Landsteiner',

    location: 'Jonas Salk',

    capacity: 5,

    is_booked: false,

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'William Harvey',
  },

  {
    name: 'Theodosius Dobzhansky',
  },

  {
    name: 'Frederick Gowland Hopkins',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }
}

// Similar logic for "relation_many"

async function associateBudgetWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Budget0 = await Budgets.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Budget0?.setOrganization) {
    await Budget0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Budget1 = await Budgets.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Budget1?.setOrganization) {
    await Budget1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Budget2 = await Budgets.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Budget2?.setOrganization) {
    await Budget2.setOrganization(relatedOrganization2);
  }
}

async function associateEventWithVenue() {
  const relatedVenue0 = await Venues.findOne({
    offset: Math.floor(Math.random() * (await Venues.count())),
  });
  const Event0 = await Events.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Event0?.setVenue) {
    await Event0.setVenue(relatedVenue0);
  }

  const relatedVenue1 = await Venues.findOne({
    offset: Math.floor(Math.random() * (await Venues.count())),
  });
  const Event1 = await Events.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Event1?.setVenue) {
    await Event1.setVenue(relatedVenue1);
  }

  const relatedVenue2 = await Venues.findOne({
    offset: Math.floor(Math.random() * (await Venues.count())),
  });
  const Event2 = await Events.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Event2?.setVenue) {
    await Event2.setVenue(relatedVenue2);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateEventWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Event0 = await Events.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Event0?.setOrganization) {
    await Event0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Event1 = await Events.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Event1?.setOrganization) {
    await Event1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Event2 = await Events.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Event2?.setOrganization) {
    await Event2.setOrganization(relatedOrganization2);
  }
}

async function associateGuestWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Guest0 = await Guests.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Guest0?.setOrganization) {
    await Guest0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Guest1 = await Guests.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Guest1?.setOrganization) {
    await Guest1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Guest2 = await Guests.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Guest2?.setOrganization) {
    await Guest2.setOrganization(relatedOrganization2);
  }
}

async function associateVendorWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Vendor0 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Vendor0?.setOrganization) {
    await Vendor0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Vendor1 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Vendor1?.setOrganization) {
    await Vendor1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Vendor2 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Vendor2?.setOrganization) {
    await Vendor2.setOrganization(relatedOrganization2);
  }
}

async function associateVenueWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Venue0 = await Venues.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Venue0?.setOrganization) {
    await Venue0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Venue1 = await Venues.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Venue1?.setOrganization) {
    await Venue1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Venue2 = await Venues.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Venue2?.setOrganization) {
    await Venue2.setOrganization(relatedOrganization2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Budgets.bulkCreate(BudgetsData);

    await Events.bulkCreate(EventsData);

    await Guests.bulkCreate(GuestsData);

    await Vendors.bulkCreate(VendorsData);

    await Venues.bulkCreate(VenuesData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      // Similar logic for "relation_many"

      await associateBudgetWithOrganization(),

      await associateEventWithVenue(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateEventWithOrganization(),

      await associateGuestWithOrganization(),

      await associateVendorWithOrganization(),

      await associateVenueWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('budgets', null, {});

    await queryInterface.bulkDelete('events', null, {});

    await queryInterface.bulkDelete('guests', null, {});

    await queryInterface.bulkDelete('vendors', null, {});

    await queryInterface.bulkDelete('venues', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
