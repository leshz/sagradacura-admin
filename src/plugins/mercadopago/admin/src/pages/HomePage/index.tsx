/*
 *
 * Plugin Awesome Help -> HomePage
 *
 */
import React, { memo, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import pluginId from "../../pluginId";
//I18n
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
//Some components
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
//Layout
import {
  ContentLayout,
  HeaderLayout,
  Layout,
} from "@strapi/design-system/Layout";
//Strapi Design-System components
import { Main } from "@strapi/design-system/Main";
import { Button } from "@strapi/design-system/Button";
import { IconButton } from "@strapi/design-system/IconButton";
import Play from "@strapi/icons/Play";
import Cog from "@strapi/icons/Cog";
import Pencil from "@strapi/icons/Pencil";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";

const HomePage = () => {
  return (
    <Main>
      <h1>HOLA ESTO ES UNA Prueba</h1>;
    </Main>
  );
};

export default memo(HomePage);
