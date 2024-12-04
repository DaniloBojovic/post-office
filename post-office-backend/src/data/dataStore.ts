import { PostOffice } from "../models/postOffice";
import { Shipment, ShipmentType, ShipmentStatus, WeightCategory } from "../models/shipment";

export const postOffices: PostOffice[] = [
  // Belgrade and its nearby cities
  { id: 1, name: "Belgrade Main Post Office", zipCode: "11000" },
  { id: 2, name: "Zemun Post Office", zipCode: "11080" },
  { id: 3, name: "Lazarevac Post Office", zipCode: "11550" },

  // Novi Sad and its nearby cities
  { id: 4, name: "Novi Sad Central Post Office", zipCode: "21000" },
  { id: 5, name: "Petrovaradin Post Office", zipCode: "21131" },
  { id: 6, name: "Sremski Karlovci Post Office", zipCode: "21205" },

  // Niš and its nearby cities
  { id: 7, name: "Niš City Post Office", zipCode: "18000" },
  { id: 8, name: "Niška Banja Post Office", zipCode: "18205" },
  { id: 9, name: "Prokuplje Post Office", zipCode: "18400" },

  // Kragujevac and its nearby cities
  { id: 10, name: "Kragujevac Main Post Office", zipCode: "34000" },
  { id: 11, name: "Aranđelovac Post Office", zipCode: "34300" },
  { id: 12, name: "Topola Post Office", zipCode: "34310" },

  // Subotica and its nearby cities
  { id: 13, name: "Subotica Main Post Office", zipCode: "24000" },
  { id: 14, name: "Palić Post Office", zipCode: "24413" },
  { id: 15, name: "Bačka Topola Post Office", zipCode: "24300" },

  // Čačak and its nearby cities
  { id: 16, name: "Čačak City Post Office", zipCode: "32000" },
  { id: 17, name: "Gornji Milanovac Post Office", zipCode: "32300" },
  { id: 18, name: "Požega Post Office", zipCode: "31210" },

  // Užice and its nearby cities
  { id: 19, name: "Užice Central Post Office", zipCode: "31000" },
  { id: 20, name: "Bajina Bašta Post Office", zipCode: "31250" },
  { id: 21, name: "Zlatibor Post Office", zipCode: "31315" },
];

export const shipments: Shipment[] = [
  // Shipments originating from Belgrade
  {
    id: 301,
    type: ShipmentType.Package,
    status: ShipmentStatus.Origin,
    weightCategory: WeightCategory.Between1kgAnd5kg,
    originPostOfficeId: 1, // Belgrade Main Post Office
    destinationPostOfficeId: 2, // Zemun Post Office
  },
  {
    id: 302,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Destination,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 1, // Belgrade Main Post Office
    destinationPostOfficeId: 3, // Lazarevac Post Office
  },

  // Shipments originating from Novi Sad
  {
    id: 303,
    type: ShipmentType.Package,
    status: ShipmentStatus.Delivered,
    weightCategory: WeightCategory.MoreThan5kg,
    originPostOfficeId: 4, // Novi Sad Central Post Office
    destinationPostOfficeId: 5, // Petrovaradin Post Office
  },
  {
    id: 304,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Destination,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 4, // Novi Sad Central Post Office
    destinationPostOfficeId: 6, // Sremski Karlovci Post Office
  },

  // Shipments originating from Niš
  {
    id: 305,
    type: ShipmentType.Package,
    status: ShipmentStatus.Delivered,
    weightCategory: WeightCategory.Between1kgAnd5kg,
    originPostOfficeId: 7, // Niš City Post Office
    destinationPostOfficeId: 8, // Niška Banja Post Office
  },
  {
    id: 306,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Delivered,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 7, // Niš City Post Office
    destinationPostOfficeId: 9, // Prokuplje Post Office
  },
  // Shipments originating from Belgrade
  {
    id: 307,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Origin,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 1, // Belgrade Main Post Office
    destinationPostOfficeId: 3, // Lazarevac Post Office
  },
  {
    id: 308,
    type: ShipmentType.Package,
    status: ShipmentStatus.Origin,
    weightCategory: WeightCategory.MoreThan5kg,
    originPostOfficeId: 1, // Belgrade Main Post Office
    destinationPostOfficeId: 2, // Zemun Post Office
  },

  // Shipments originating from Novi Sad
  {
    id: 309,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Destination,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 4, // Novi Sad Central Post Office
    destinationPostOfficeId: 5, // Petrovaradin Post Office
  },
  {
    id: 310,
    type: ShipmentType.Package,
    status: ShipmentStatus.Origin,
    weightCategory: WeightCategory.Between1kgAnd5kg,
    originPostOfficeId: 4, // Novi Sad Central Post Office
    destinationPostOfficeId: 6, // Sremski Karlovci Post Office
  },

  // Shipments originating from Niš
  {
    id: 311,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Delivered,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 7, // Niš City Post Office
    destinationPostOfficeId: 9, // Prokuplje Post Office
  },
  {
    id: 312,
    type: ShipmentType.Package,
    status: ShipmentStatus.Origin,
    weightCategory: WeightCategory.MoreThan5kg,
    originPostOfficeId: 7, // Niš City Post Office
    destinationPostOfficeId: 8, // Niška Banja Post Office
  },

  // Shipments originating from Kragujevac
  {
    id: 313,
    type: ShipmentType.Package,
    status: ShipmentStatus.Destination,
    weightCategory: WeightCategory.Between1kgAnd5kg,
    originPostOfficeId: 10, // Kragujevac Main Post Office
    destinationPostOfficeId: 11, // Aranđelovac Post Office
  },
  {
    id: 314,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Delivered,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 10, // Kragujevac Main Post Office
    destinationPostOfficeId: 12, // Topola Post Office
  },

  // Shipments originating from Subotica
  {
    id: 315,
    type: ShipmentType.Package,
    status: ShipmentStatus.Origin,
    weightCategory: WeightCategory.MoreThan5kg,
    originPostOfficeId: 13, // Subotica Main Post Office
    destinationPostOfficeId: 14, // Palić Post Office
  },
  {
    id: 316,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Destination,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 13, // Subotica Main Post Office
    destinationPostOfficeId: 15, // Bačka Topola Post Office
  },

  // Shipments originating from Čačak
  {
    id: 317,
    type: ShipmentType.Package,
    status: ShipmentStatus.Destination,
    weightCategory: WeightCategory.Between1kgAnd5kg,
    originPostOfficeId: 16, // Čačak City Post Office
    destinationPostOfficeId: 17, // Gornji Milanovac Post Office
  },
  {
    id: 318,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Origin,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 16, // Čačak City Post Office
    destinationPostOfficeId: 18, // Požega Post Office
  },

  // Shipments originating from Užice
  {
    id: 319,
    type: ShipmentType.Package,
    status: ShipmentStatus.Destination,
    weightCategory: WeightCategory.Between1kgAnd5kg,
    originPostOfficeId: 19, // Užice Central Post Office
    destinationPostOfficeId: 20, // Bajina Bašta Post Office
  },
  {
    id: 320,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Delivered,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 19, // Užice Central Post Office
    destinationPostOfficeId: 21, // Zlatibor Post Office
  },

  // Cross-city shipments
  {
    id: 321,
    type: ShipmentType.Package,
    status: ShipmentStatus.Origin,
    weightCategory: WeightCategory.MoreThan5kg,
    originPostOfficeId: 1, // Belgrade Main Post Office
    destinationPostOfficeId: 4, // Novi Sad Central Post Office
  },
  {
    id: 322,
    type: ShipmentType.Letter,
    status: ShipmentStatus.Destination,
    weightCategory: WeightCategory.LessThan1kg,
    originPostOfficeId: 7, // Niš City Post Office
    destinationPostOfficeId: 10, // Kragujevac Main Post Office
  },
];
