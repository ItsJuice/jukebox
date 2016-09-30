defmodule Juicebox.StreamChannelTest do
  use Juicebox.ChannelCase

  alias Juicebox.StreamChannel
  alias Juicebox.Stream.Server

  @stream_id "main"
  @video %{id: "2222", duration: 30000}
  @payload %{"video" => @video, "stream_id" => @stream_id}

  setup do
    {:ok, _, socket} =
      subscribe_and_join(socket, StreamChannel, "stream:main")
    {:ok, socket: socket}
  end

  test "adding a video", %{socket: socket} do
    push(socket, "video.added", @payload)
    {:ok, state} = Server.playing(@stream_id)
    assert state == @video
  end
end