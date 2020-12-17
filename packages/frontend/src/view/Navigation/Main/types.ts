import React from 'react';

export type GroupItem = {
  text: string;
  link: string;
  Icon: React.JSXElementConstructor<{}>;
}

export type Group = {
  name?: string;
  items: GroupItem[];
};
