defmodule Juicebox.StreamChannelTest do
  use Juicebox.ChannelCase

  import Mock

  alias Juicebox.StreamChannel
  alias Phoenix.PubSub

  @stream_id "main"
  @video %{id: "2222", duration: 30000}
  @payload %{"video" => @video, "stream_id" => @stream_id}

  setup do
    {:ok, _, socket} =
      subscribe_and_join(socket, StreamChannel, "stream:" <> @stream_id)
    {:ok, socket: socket}
  end

  test "adding a video", %{socket: socket} do
    with_mock Juicebox.Stream.Server, [add: fn(_stream_id, _track) -> {:ok, []} end] do
      push(socket, "video.added", @payload)
      assert called Juicebox.Stream.Server.add(@stream_id, %{video: @video})
    end
  end

  test "when a video is added, it is broadcast on all the channels", %{socket: socket} do
    PubSub.broadcast(Juicebox.PubSub, 
      "juicebox:stream:server:" <> @stream_id, 
      %{ action: 'update_queue', new_queue: [] } 
    )
    assert_receive %Phoenix.Socket.Broadcast{
      topic: "stream:" <> @stream_id,
      event: "queue.updated",
      payload: %{queue: []}
    }
  end
end
