defmodule Juicebox.Stream.SupervisorTests do
  use ExUnit.Case, async: true
  alias Juicebox.Stream.Supervisor

  setup do
    [
      stream_1_id: 'stream1',
      stream_2_id: 'stream2'
    ]
  end

  describe ".streams" do
    test "auto-starts playback", ctx do
      {:ok, _} = Supervisor.start_stream(ctx.stream_1_id)
      {:ok, _} = Supervisor.start_stream(ctx.stream_2_id)
      assert length(Supervisor.streams) == 2
    end
  end
end