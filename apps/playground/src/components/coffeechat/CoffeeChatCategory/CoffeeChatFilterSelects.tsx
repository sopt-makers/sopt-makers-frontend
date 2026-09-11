import { SelectV2 } from '@sopt-makers/ui';

import { CAREER_FILTER_OPTIONS, PART_FILTER_OPTIONS, TOPIC_FILTER_OPTIONS } from '@/components/coffeechat/constants';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';

import type { CoffeeChatFilters, SetCoffeeChatFilter } from './useCoffeeChatFilters';

const SELECTS = [
  { key: 'topicType', className: 'topic-select', placeholder: '주제', options: TOPIC_FILTER_OPTIONS },
  { key: 'career', className: 'career-select', placeholder: '경력', options: CAREER_FILTER_OPTIONS },
  { key: 'part', className: 'part-select', placeholder: '파트', options: PART_FILTER_OPTIONS },
] as const;

interface Props {
  filters: CoffeeChatFilters;
  setFilter: SetCoffeeChatFilter;
}

const CoffeeChatFilterSelects = ({ filters, setFilter }: Props) => {
  return (
    <>
      {SELECTS.map(({ key, className, placeholder, options }) => (
        // SelectV2는 defaultValue만 지원하므로 해당 URL 값이 바뀔 때만 선택 컴포넌트를 다시 생성합니다.
        <SelectV2.Root
          key={`${key}:${filters[key]}`}
          className={className}
          onChange={(value: string) => setFilter(key, value)}
          type='text'
          defaultValue={filters[key] ? options.find((option) => option.value === filters[key]) : undefined}
          visibleOptions={4}
        >
          <SelectV2.Trigger>
            <SelectV2.TriggerContent placeholder={placeholder} />
          </SelectV2.Trigger>
          <SelectV2.Menu>
            {options.map((option) => (
              <LoggingClick
                key={option.value}
                eventKey='coffeechatFilter'
                param={{ topic_tag: filters.topicType, career: filters.career, part: filters.part }}
              >
                <SelectV2.MenuItem option={option} />
              </LoggingClick>
            ))}
          </SelectV2.Menu>
        </SelectV2.Root>
      ))}
    </>
  );
};

export default CoffeeChatFilterSelects;
