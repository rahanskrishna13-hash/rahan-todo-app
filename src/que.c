#include <stdio.h>
#define MAX 5
typedef int element;
element queue[MAX];
int front = -1, rear = -1;
int isempty()
{
    if (front == -1)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
int isfull()
{
    if (rear == MAX - 1)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

void enqueue(int item)
{
    if (isfull())
    {
    }
    else if (isempty())
    {
        front = 0;
    }
    queue[++rear] = item;
    printf("item is enqueued", item);
}
void dequeue(int item)
{
    if (isempty())
    {
        printf("no elements");
    }
}