/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Radio, Space } from 'antd';
import useI18NPrefix, { I18NComponentProps } from 'app/hooks/useI18NPrefix';
import TimeConfigContext from 'app/pages/ChartWorkbenchPage/contexts/TimeConfigContext';
import { FilterCondition } from 'app/types/ChartConfig';
import { recommendTimeRangeConverter } from 'app/utils/time';
import { RECOMMEND_TIME } from 'globalConstants';
import { FC, memo, useContext, useMemo, useState } from 'react';
import ChartFilterCondition, {
  ConditionBuilder,
} from '../../../../models/ChartFilterCondition';
import CurrentRangeTime from './CurrentRangeTime';

const RecommendRangeTimeSelector: FC<
  {
    condition?: FilterCondition;
    onConditionChange: (condition: ChartFilterCondition) => void;
  } & I18NComponentProps
> = memo(({ i18nPrefix, condition, onConditionChange }) => {
  const t = useI18NPrefix(i18nPrefix);
  const { format } = useContext(TimeConfigContext);
  const [recommend, setRecommend] = useState<string | undefined>(() =>
    String(condition?.value),
  );

  const handleChange = recommendTime => {
    setRecommend(recommendTime);
    const filter = new ConditionBuilder(condition)
      .setValue(recommendTime)
      .asRecommendTime();
    onConditionChange?.(filter);
  };

  const rangeTimes = useMemo(() => {
    return recommendTimeRangeConverter(recommend);
  }, [recommend]);

  return (
    <>
      <Space direction="vertical">
        <CurrentRangeTime times={rangeTimes} />
        <Radio.Group
          value={recommend}
          onChange={e => handleChange(e.target?.value)}
        >
          <Space direction="vertical">
            <Radio value={RECOMMEND_TIME.TODAY}>
              {t(RECOMMEND_TIME.TODAY)}
            </Radio>
            <Radio value={RECOMMEND_TIME.YESTERDAY}>
              {t(RECOMMEND_TIME.YESTERDAY)}
            </Radio>
            <Radio value={RECOMMEND_TIME.THISWEEK}>
              {t(RECOMMEND_TIME.THISWEEK)}
            </Radio>
          </Space>
          <Space direction="vertical">
            <Radio value={RECOMMEND_TIME.LAST_7_DAYS}>
              {t(RECOMMEND_TIME.LAST_7_DAYS)}
            </Radio>
            <Radio value={RECOMMEND_TIME.LAST_30_DAYS}>
              {t(RECOMMEND_TIME.LAST_30_DAYS)}
            </Radio>
            <Radio value={RECOMMEND_TIME.LAST_90_DAYS}>
              {t(RECOMMEND_TIME.LAST_90_DAYS)}
            </Radio>
            <Radio value={RECOMMEND_TIME.LAST_1_MONTH}>
              {t(RECOMMEND_TIME.LAST_1_MONTH)}
            </Radio>
            <Radio value={RECOMMEND_TIME.LAST_1_YEAR}>
              {t(RECOMMEND_TIME.LAST_1_YEAR)}
            </Radio>
          </Space>
        </Radio.Group>
      </Space>
    </>
  );
});

export default RecommendRangeTimeSelector;
