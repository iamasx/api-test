type GuideFiltersProps = {
  difficulties: readonly string[];
  playbookStatuses: readonly string[];
  selectedPlaybookStatus: string;
  selectedTag: string;
  statuses: readonly string[];
  tags: readonly string[];
  teams: readonly string[];
  selectedTeam: string;
  selectedDifficulty: string;
  selectedStatus: string;
  hasActiveFilters: boolean;
  onDifficultyChange: (value: string) => void;
  onPlaybookStatusChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onTeamChange: (value: string) => void;
  onClear: () => void;
};

type FilterSelectProps = {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

function FilterSelect({
  id,
  label,
  options,
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="all">All {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function GuideFilters({
  teams,
  difficulties,
  tags,
  statuses,
  playbookStatuses,
  selectedTeam,
  selectedDifficulty,
  selectedStatus,
  selectedTag,
  selectedPlaybookStatus,
  hasActiveFilters,
  onTeamChange,
  onDifficultyChange,
  onStatusChange,
  onTagChange,
  onPlaybookStatusChange,
  onClear,
}: GuideFiltersProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/70 bg-slate-950 p-5 text-slate-50 shadow-lg shadow-slate-300/50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Filters
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Narrow the library without changing routes or requesting new data.
          </p>
        </div>
        <button
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-slate-500"
          disabled={!hasActiveFilters}
          onClick={onClear}
          type="button"
        >
          Clear all
        </button>
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-5">
        <FilterSelect
          id="team-filter"
          label="Teams"
          onChange={onTeamChange}
          options={teams}
          value={selectedTeam}
        />
        <FilterSelect
          id="difficulty-filter"
          label="Difficulty"
          onChange={onDifficultyChange}
          options={difficulties}
          value={selectedDifficulty}
        />
        <FilterSelect
          id="status-filter"
          label="Status"
          onChange={onStatusChange}
          options={statuses}
          value={selectedStatus}
        />
        <FilterSelect
          id="playbook-status-filter"
          label="Playbook status"
          onChange={onPlaybookStatusChange}
          options={playbookStatuses}
          value={selectedPlaybookStatus}
        />
        <FilterSelect
          id="tag-filter"
          label="Tags"
          onChange={onTagChange}
          options={tags}
          value={selectedTag}
        />
      </div>
    </section>
  );
}
