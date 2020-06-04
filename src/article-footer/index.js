import React from 'react';
import { strftime } from '../shared/helpers';
import { GridContainer, GridRow, GridChild } from '../grid';

const ArticleFooter = () => (
  <footer
            className="o-typography-footer"
            itemProp="publisher"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <GridContainer>
              <GridRow>
                <GridChild colspan="12 S11 Scenter M9 L8 XL7">
                  <small>
                    <a
                      href="http://www.ft.com/servicestools/help/copyright"
                      data-trackable="link-copyright"
                    >
                      Copyright
                    </a>{' '}
                    <span itemProp="name">The Financial Times</span> Limited{' '}
                    {strftime('%Y')(new Date())}. All rights reserved. You may share using our
                    article tools. Please don&apos;t cut articles from FT.com and redistribute by
                    email or post to the web.
                  </small>
                </GridChild>
              </GridRow>
            </GridContainer>
          </footer>)
          

export default ArticleFooter;