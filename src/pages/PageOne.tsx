import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { LinkButton, useStyles2 } from '@grafana/ui';
import { prefixRoute } from '../utils/utils.routing';
import { ROUTES } from '../constants';
import { testIds } from '../components/testIds';
import { PluginPage } from '@grafana/runtime';
import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';

async function getMyCustomEndpoint() {
  const response = await getBackendSrv().fetch({
    // replace ${PLUGIN_ID} with your plugin id
    url: '/api/plugins/yang1666204-dorisdatasourcetest-app/ping',
  });
  const res = await lastValueFrom(response);
  console.log('res',res);
  
}

function PageOne() {
  const s = useStyles2(getStyles);

  useEffect(()=>{
    getMyCustomEndpoint()
  },[])

  return (
    <PluginPage>
      <div data-testid={testIds.pageOne.container}>
        This is page one.
        <div className={s.marginTop}>
          <LinkButton data-testid={testIds.pageOne.navigateToFour} href={prefixRoute(ROUTES.Four)}>
            Full-width page example
          </LinkButton>
        </div>
      </div>
    </PluginPage>
  );
}

export default PageOne;

const getStyles = (theme: GrafanaTheme2) => ({
  marginTop: css`
    margin-top: ${theme.spacing(2)};
  `,
});
