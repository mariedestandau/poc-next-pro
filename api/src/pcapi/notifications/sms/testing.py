requests: list[dict] = []


def reset_requests() -> None:
    global requests  # pylint: disable=global-statement
    requests = []
