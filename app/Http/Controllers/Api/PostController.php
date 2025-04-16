<?php

namespace App\Http\Controllers\Api;


use App\Models\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::with('user')->latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = $request->user()->posts()->create($request->only('title', 'content'));

        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = Post::find($id); // find ile id'ye göre sorgulama yapılır
    
        // Eğer post bulunmazsa
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404); 
        }
    
        return response()->json($post); // post döndürülür
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post->update($request->only('title', 'content'));

        return $post;
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();

        return response()->noContent();
    }
}

