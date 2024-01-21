"use strict";

import { v4 as uuid } from "uuid";

export default {
  beforeCreate: async (data) => {
    if (!data.params.data.uuid) {
      data.params.data.uuid = uuid();
    }
  },
};
